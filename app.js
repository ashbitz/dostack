const STORAGE_KEYS = {
  theme: "theme",
  tasks: "tasks"
};

const VALID_PRIORITIES = new Set(["alta", "media", "baja"]);
const FILTER_VALUES = new Set(["all", "open", "closed"]);
const FIELD_LIMITS = {
  min: 3,
  max: 20
};
const MOON_ICON = "\u{1F311}";
const SUN_ICON = "\u2600\uFE0F";

const ACTIVE_NAV_CLASSES = ["bg-slate-100", "dark:bg-slate-700", "font-semibold"];
const PRIORITY_PLACEHOLDER_CLASSES = ["text-slate-400", "dark:text-slate-500"];
const PRIORITY_VALUE_CLASSES = ["text-slate-900", "dark:text-slate-100"];
const PRIORITY_CLASS_NAMES = {
  alta: "bg-red-100 text-red-700",
  media: "bg-yellow-100 text-yellow-700",
  baja: "bg-green-100 text-green-700"
};
const TASK_CLASS_NAMES = {
  articleBase:
    "mb-3 flex items-center justify-between gap-3 rounded-lg border px-3 py-2 shadow-sm transition-transform hover:-translate-y-[2px] hover:shadow-lg md:grid md:grid-cols-[auto_20ch_10ch_1fr_6rem_2.5rem] md:items-center md:justify-normal md:gap-x-4 md:gap-y-0",
  article: {
    active: "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800",
    completed:
      "border-slate-200 bg-slate-100 opacity-70 dark:border-slate-600 dark:bg-slate-700"
  },
  title: {
    active:
      "min-w-0 text-left text-[1.05rem] font-semibold text-slate-900 dark:text-slate-100 md:w-full md:pl-20",
    completed:
      "min-w-0 text-left text-[1.05rem] font-semibold text-slate-500 line-through dark:text-slate-400 md:w-full md:pl-20"
  },
  category: {
    active:
      "min-w-0 text-left text-sm italic text-slate-500 dark:text-slate-300 md:w-full md:pl-45",
    completed:
      "min-w-0 text-left text-sm italic text-slate-400 line-through dark:text-slate-500 md:w-full md:pl-45"
  },
  checkbox: "h-4 w-4 shrink-0 accent-slate-600",
  badge:
    "inline-flex w-fit shrink-0 items-center rounded-full px-2 py-1 text-xs font-semibold md:col-start-5 md:justify-self-start",
  deleteButton:
    "ml-2 flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center border-0 bg-transparent text-3xl leading-none text-gray-400 transition-colors hover:text-red-500 md:col-start-6 md:ml-0 md:justify-self-end"
};
const TASK_FIELD_MESSAGES = {
  title: {
    required: "El titulo es obligatorio.",
    min: "El titulo debe tener al menos 3 caracteres.",
    max: "El titulo no puede superar los 20 caracteres."
  },
  category: {
    required: "La categoria es obligatoria.",
    min: "La categoria debe tener al menos 3 caracteres.",
    max: "La categoria no puede superar los 20 caracteres."
  }
};

/**
 * @typedef {{ required: string, min: string, max: string }} TextFieldMessages
 * @typedef {{ isValid: false, error: string } | { isValid: true, value: string }} ValidationResult
 */

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const categoryInput = document.querySelector("#category-input");
const priorityInput = document.querySelector("#priority-input");
const taskFormError = document.querySelector("#task-form-error");
const taskList = document.querySelector("#task-list");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll("[data-filter]");

let tasks = [];
let currentFilter = "all";
const taskElements = new WeakMap();
let draggedTaskId = null;
const dragIndicator = document.createElement("div");

dragIndicator.className = "mx-3 my-1 h-0 border-t-2 border-indigo-500";
dragIndicator.setAttribute("aria-hidden", "true");
dragIndicator.style.pointerEvents = "none";

function getStorageItem(key) {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`No se pudo leer "${key}" desde localStorage:`, error);
    return null;
  }
}

function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, value);
    return true;
  } catch (error) {
    console.error(`No se pudo guardar "${key}" en localStorage:`, error);
    return false;
  }
}

function removeStorageItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`No se pudo eliminar "${key}" de localStorage:`, error);
  }
}

function createTaskId() {
  if (globalThis.crypto?.randomUUID) {
    return globalThis.crypto.randomUUID();
  }

  return `task-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeTextValue(value) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeTask(rawTask) {
  if (!rawTask || typeof rawTask !== "object") {
    return null;
  }

  const title = normalizeTextValue(rawTask.title);
  const category = normalizeTextValue(rawTask.category);
  const rawPriority =
    typeof rawTask.priority === "string" ? rawTask.priority.toLowerCase() : "";

  if (!title || !category) {
    return null;
  }

  return {
    id:
      typeof rawTask.id === "string" && rawTask.id.trim()
        ? rawTask.id
        : createTaskId(),
    title,
    category,
    priority: VALID_PRIORITIES.has(rawPriority) ? rawPriority : "alta",
    completed: Boolean(rawTask.completed)
  };
}

function shouldPersistNormalizedTasks(parsedTasks, normalizedTasks) {
  if (parsedTasks.length !== normalizedTasks.length) {
    return true;
  }

  return parsedTasks.some((rawTask, index) => {
    const normalizedTask = normalizedTasks[index];
    const rawId =
      rawTask && typeof rawTask === "object" && typeof rawTask.id === "string"
        ? rawTask.id
        : "";
    const rawPriority =
      rawTask && typeof rawTask === "object" && typeof rawTask.priority === "string"
        ? rawTask.priority.toLowerCase()
        : "";

    return (
      rawId !== normalizedTask.id ||
      rawPriority !== normalizedTask.priority ||
      Boolean(rawTask?.completed) !== normalizedTask.completed ||
      rawTask?.title !== normalizedTask.title ||
      rawTask?.category !== normalizedTask.category
    );
  });
}

/**
 * Serializa la lista actual de tareas y la guarda en `localStorage`.
 *
 * @param {{ notifyOnError?: boolean }} [options={}] Opciones de guardado.
 * @param {boolean} [options.notifyOnError=true] Indica si se debe mostrar una alerta cuando falle el guardado.
 * @returns {void}
 */
function saveTasks({ notifyOnError = true } = {}) {
  try {
    const serializedTasks = JSON.stringify(tasks);
    const saved = setStorageItem(STORAGE_KEYS.tasks, serializedTasks);

    if (!saved && notifyOnError) {
      alert(
        "No se pudo guardar la tarea. Puede que el almacenamiento local este desactivado o lleno."
      );
    }
  } catch (error) {
    console.error("Error al serializar las tareas:", error);
    if (notifyOnError) {
      alert("No se pudo preparar la tarea para guardarla.");
    }
  }
}

/**
 * Recupera las tareas guardadas desde `localStorage`, las normaliza y elimina datos invalidos si es necesario.
 *
 * @returns {{ id: string, title: string, category: string, priority: string, completed: boolean }[]} Lista de tareas restauradas.
 */
function loadTasks() {
  const savedTasks = getStorageItem(STORAGE_KEYS.tasks);

  if (!savedTasks) {
    return [];
  }

  try {
    const parsedTasks = JSON.parse(savedTasks);

    if (!Array.isArray(parsedTasks)) {
      throw new Error("El contenido guardado no es una lista de tareas.");
    }

    const normalizedTasks = parsedTasks
      .map(normalizeTask)
      .filter((task) => task !== null);

    if (shouldPersistNormalizedTasks(parsedTasks, normalizedTasks)) {
      console.warn("Se normalizaron tareas guardadas al restaurar la sesion.");
      tasks = normalizedTasks;
      saveTasks({ notifyOnError: false });
    }

    return normalizedTasks;
  } catch (error) {
    console.error("No se pudieron recuperar las tareas guardadas:", error);
    removeStorageItem(STORAGE_KEYS.tasks);
    return [];
  }
}

function updateThemeButton(isDark) {
  themeToggle.textContent = isDark ? SUN_ICON : MOON_ICON;
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Activar modo claro" : "Activar modo oscuro"
  );
  themeToggle.setAttribute("aria-pressed", String(isDark));
}

function setActiveNav(activeButton) {
  filterButtons.forEach((button) => {
    button.classList.remove(...ACTIVE_NAV_CLASSES);
    button.setAttribute("aria-pressed", String(button === activeButton));
  });
}

function isTaskVisible(task) {
  if (currentFilter === "open") {
    return !task.completed;
  }

  if (currentFilter === "closed") {
    return task.completed;
  }

  return true;
}

/**
 * Aplica el filtro de visibilidad actual a las tareas renderizadas en el DOM.
 *
 * @returns {void}
 */
function applyFilter() {
  tasks.forEach((task) => {
    const elements = taskElements.get(task);
    if (!elements) {
      return;
    }

    elements.article.hidden = !isTaskVisible(task);
  });

  updateTaskDraggability();
}

function updateTaskDraggability() {
  const canReorderTasks = currentFilter === "all";

  if (!canReorderTasks) {
    clearDragIndicator();
    draggedTaskId = null;
  }

  tasks.forEach((task) => {
    const elements = taskElements.get(task);
    if (!elements) {
      return;
    }

    elements.article.draggable = canReorderTasks;
    elements.article.style.cursor = canReorderTasks ? "grab" : "";

    if (!canReorderTasks) {
      elements.article.setAttribute("aria-grabbed", "false");
      elements.article.style.opacity = "";
    }
  });
}

function clearDragIndicator() {
  if (dragIndicator.parentNode) {
    dragIndicator.parentNode.removeChild(dragIndicator);
  }
}

function getTaskById(taskId) {
  return tasks.find((task) => task.id === taskId) ?? null;
}

/**
 * Calcula el elemento visible de la lista delante del que debe mostrarse
 * el indicador de insercion durante el arrastre.
 *
 * El algoritmo compara la posicion vertical actual del puntero con el centro
 * de cada tarea renderizada y devuelve la primera tarea que queda por debajo
 * del cursor. Si no encuentra ninguna, la tarea arrastrada se insertara al
 * final del listado.
 *
 * @param {number} pointerY
 * Coordenada vertical actual del puntero durante el evento de drag.
 * @returns {HTMLElement | null}
 * Elemento de referencia antes del cual se mostrara el indicador de insercion,
 * o `null` si la tarea debe colocarse al final.
 */
function getDragAfterElement(pointerY) {
  const draggableArticles = [...taskList.querySelectorAll("[data-task-id]")].filter(
    (article) => article.dataset.taskId !== draggedTaskId && !article.hidden
  );

  const closest = draggableArticles.reduce(
    (result, article) => {
      const box = article.getBoundingClientRect();
      const offset = pointerY - box.top - box.height / 2;

      if (offset < 0 && offset > result.offset) {
        return { offset, element: article };
      }

      return result;
    },
    { offset: Number.NEGATIVE_INFINITY, element: null }
  );

  return closest.element;
}

function placeDragIndicator(afterElement) {
  if (!dragIndicator.parentNode) {
    taskList.append(dragIndicator);
  }

  if (!afterElement) {
    taskList.append(dragIndicator);
    return;
  }

  taskList.insertBefore(dragIndicator, afterElement);
}

function syncTaskOrderWithDOM() {
  const orderedTaskIds = [...taskList.querySelectorAll("[data-task-id]")]
    .map((article) => article.dataset.taskId)
    .filter(Boolean);

  const taskById = new Map(tasks.map((task) => [task.id, task]));
  tasks = orderedTaskIds
    .reverse()
    .map((taskId) => taskById.get(taskId))
    .filter((task) => task !== undefined);

  saveTasks();
}

/**
 * Coloca definitivamente la tarea arrastrada en la posicion marcada por el
 * indicador visual de insercion y sincroniza el nuevo orden con el estado.
 *
 * Cuando termina el arrastre, esta funcion mueve el `<article>` correspondiente
 * a la tarea activa hasta la posicion actual del `dragIndicator`. Despues
 * elimina dicho indicador y reconstruye el array `tasks` segun el orden real
 * del DOM para que la persistencia y los futuros renders respeten ese orden.
 *
 * @returns {void}
 */
function finalizeDraggedTaskPosition() {
  if (!draggedTaskId) {
    clearDragIndicator();
    return;
  }

  const draggedTask = getTaskById(draggedTaskId);
  const draggedElements = draggedTask ? taskElements.get(draggedTask) : null;

  if (!draggedElements) {
    clearDragIndicator();
    return;
  }

  if (dragIndicator.parentNode) {
    taskList.insertBefore(draggedElements.article, dragIndicator);
  }

  clearDragIndicator();
  syncTaskOrderWithDOM();
}

/**
 * Registra los eventos globales de drag and drop sobre la lista de tareas.
 *
 * El sistema de reordenacion funciona asi:
 * 1. Cada tarea individual inicia el arrastre en `dragstart` y guarda su id en
 *    `draggedTaskId`.
 * 2. Mientras el puntero se mueve sobre `#task-list`, el evento `dragover`
 *    calcula en que posicion deberia caer la tarea usando `getDragAfterElement()`.
 * 3. Con esa referencia se mueve un indicador visual (`dragIndicator`) que
 *    muestra el punto exacto de insercion.
 * 4. Al soltar la tarea (`drop`) o al finalizar el arrastre, se llama a
 *    `finalizeDraggedTaskPosition()` para mover el nodo, limpiar el indicador y
 *    persistir el nuevo orden.
 *
 * La reordenacion solo esta habilitada cuando el filtro activo es `all`, para
 * evitar inconsistencias al intentar ordenar una lista parcialmente oculta.
 *
 * @returns {void}
 */
function attachTaskListDragAndDropHandlers() {
  taskList.addEventListener("dragover", (event) => {
    if (currentFilter !== "all" || !draggedTaskId || !getTaskById(draggedTaskId)) {
      return;
    }

    event.preventDefault();
    placeDragIndicator(getDragAfterElement(event.clientY));
  });

  taskList.addEventListener("drop", (event) => {
    if (currentFilter !== "all" || !draggedTaskId) {
      return;
    }

    event.preventDefault();
    finalizeDraggedTaskPosition();
  });
}

function getPriorityClasses(priority) {
  return PRIORITY_CLASS_NAMES[priority] ?? PRIORITY_CLASS_NAMES.baja;
}

/**
 * Crea una respuesta de validacion invalida con un mensaje de error.
 *
 * @param {string} error
 * @returns {ValidationResult}
 */
function createValidationError(error) {
  return {
    isValid: false,
    error
  };
}

/**
 * Crea una respuesta de validacion valida con el valor normalizado.
 *
 * @param {string} value
 * @returns {ValidationResult}
 */
function createValidationSuccess(value) {
  return {
    isValid: true,
    value
  };
}

function setTaskFormError(message = "") {
  if (!taskFormError) {
    return;
  }

  taskFormError.textContent = message;
  taskFormError.classList.toggle("hidden", !message);
}

/**
 * Normaliza y valida un campo de texto del formulario.
 *
 * Recorta espacios al inicio y al final y comprueba que el valor resultante
 * no este vacio ni fuera de los limites permitidos.
 *
 * @param {string} value
 * Valor introducido en el campo.
 * @param {TextFieldMessages} messages
 * Mensajes de error para los casos de obligatorio, minimo y maximo.
 * @returns {ValidationResult}
 * Resultado de la validacion con el valor normalizado o el error detectado.
 */
function validateTextField(value, { required, min, max }) {
  const normalizedValue = normalizeTextValue(value);

  if (!normalizedValue) {
    return createValidationError(required);
  }

  if (normalizedValue.length < FIELD_LIMITS.min) {
    return createValidationError(min);
  }

  if (normalizedValue.length > FIELD_LIMITS.max) {
    return createValidationError(max);
  }

  return createValidationSuccess(normalizedValue);
}

/**
 * Valida y normaliza los valores introducidos para crear una nueva tarea.
 *
 * @param {string} title Titulo introducido por la persona usuaria.
 * @param {string} category Categoria introducida por la persona usuaria.
 * @param {string} priority Prioridad seleccionada por la persona usuaria.
 * @returns {{ isValid: false, error: string } | { isValid: true, title: string, category: string, priority: string }} Resultado de la validacion.
 */
function validateTaskInput(title, category, priority) {
  const titleResult = validateTextField(title, TASK_FIELD_MESSAGES.title);
  if (!titleResult.isValid) {
    return titleResult;
  }

  const categoryResult = validateTextField(
    category,
    TASK_FIELD_MESSAGES.category
  );
  if (!categoryResult.isValid) {
    return categoryResult;
  }

  const normalizedTitle = titleResult.value;
  const normalizedCategory = categoryResult.value;
  const normalizedPriority =
    typeof priority === "string" ? priority.trim().toLowerCase() : "";

  if (!VALID_PRIORITIES.has(normalizedPriority)) {
    return {
      isValid: false,
      error: "La prioridad es obligatoria."
    };
  }

  const isDuplicateTitle = tasks.some(
    (task) => task.title.toLowerCase() === normalizedTitle.toLowerCase()
  );

  if (isDuplicateTitle) {
    return {
      isValid: false,
      error: "Ya existe una tarea con ese titulo."
    };
  }

  return {
    isValid: true,
    title: normalizedTitle,
    category: normalizedCategory,
    priority: normalizedPriority
  };
}

function updatePriorityInputAppearance() {
  const hasSelectedPriority = VALID_PRIORITIES.has(priorityInput.value);

  PRIORITY_PLACEHOLDER_CLASSES.forEach((className) => {
    priorityInput.classList.toggle(className, !hasSelectedPriority);
  });

  PRIORITY_VALUE_CLASSES.forEach((className) => {
    priorityInput.classList.toggle(className, hasSelectedPriority);
  });
}

/**
 * Crea los elementos del DOM necesarios para representar una tarea.
 *
 * @param {{ id: string, title: string, category: string, priority: string, completed: boolean }} task Tarea a representar.
 * @returns {{ article: HTMLElement, checkbox: HTMLInputElement, title: HTMLSpanElement, category: HTMLSpanElement, badge: HTMLSpanElement, deleteBtn: HTMLButtonElement }} Elementos creados para la tarea.
 */
function createTaskElement(task) {
  const article = document.createElement("article");
  article.setAttribute("role", "listitem");
  article.setAttribute("aria-grabbed", "false");
  article.dataset.taskId = task.id;
  article.draggable = currentFilter === "all";
  article.style.cursor = currentFilter === "all" ? "grab" : "";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  checkbox.className = TASK_CLASS_NAMES.checkbox;
  checkbox.setAttribute("aria-label", `Marcar tarea ${task.title} como completada`);

  const title = document.createElement("span");
  title.textContent = task.title;

  const category = document.createElement("span");
  category.textContent = task.category;

  const badge = document.createElement("span");
  badge.className = `${TASK_CLASS_NAMES.badge} ${getPriorityClasses(task.priority)}`;
  badge.textContent = task.priority.charAt(0).toUpperCase() + task.priority.slice(1);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.textContent = "\u00D7";
  deleteBtn.className = TASK_CLASS_NAMES.deleteButton;
  deleteBtn.setAttribute("aria-label", `Eliminar tarea ${task.title}`);

  article.append(checkbox, title, category, badge, deleteBtn);

  return { article, checkbox, title, category, badge, deleteBtn };
}

/**
 * Actualiza las clases CSS de una tarea segun su estado de completado.
 *
 * @param {{ completed: boolean }} task Tarea cuyo estado visual se debe reflejar.
 * @param {{ article: HTMLElement, title: HTMLElement, category: HTMLElement }} elements Elementos del DOM asociados a la tarea.
 * @returns {void}
 */
function updateTaskStyle(task, elements) {
  const state = task.completed ? "completed" : "active";

  elements.article.className = `${TASK_CLASS_NAMES.articleBase} ${TASK_CLASS_NAMES.article[state]}`;
  elements.title.className = TASK_CLASS_NAMES.title[state];
  elements.category.className = TASK_CLASS_NAMES.category[state];
}

function commitTasksChange() {
  saveTasks();
  applyFilter();
}

/**
 * Registra los eventos necesarios para completar o eliminar una tarea desde la interfaz.
 *
 * @param {{ id: string, completed: boolean }} task Tarea asociada a los eventos.
 * @param {{ article: HTMLElement, checkbox: HTMLInputElement, deleteBtn: HTMLButtonElement }} elements Elementos interactivos de la tarea.
 * @returns {void}
 */
function attachTaskEventHandlers(task, elements) {
  const { article, checkbox, deleteBtn } = elements;

  article.addEventListener("dragstart", (event) => {
    if (currentFilter !== "all") {
      event.preventDefault();
      return;
    }

    draggedTaskId = task.id;
    article.setAttribute("aria-grabbed", "true");
    article.style.opacity = "0.6";
    article.style.cursor = "grabbing";

    if (event.dataTransfer) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", task.id);
    }
  });

  article.addEventListener("dragend", () => {
    article.setAttribute("aria-grabbed", "false");
    article.style.opacity = "";
    article.style.cursor = currentFilter === "all" ? "grab" : "";

    if (draggedTaskId === task.id) {
      finalizeDraggedTaskPosition();
      draggedTaskId = null;
    }
  });

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    updateTaskStyle(task, elements);
    commitTasksChange();
  });

  deleteBtn.addEventListener("click", () => {
    article.remove();
    taskElements.delete(task);
    tasks = tasks.filter((storedTask) => storedTask.id !== task.id);
    commitTasksChange();
  });
}

/**
 * Crea los nodos HTML de una tarea, les aplica su estado visual, registra
 * sus eventos y los inserta al principio de la lista de tareas de la app.
 *
 * Dentro del flujo de la aplicacion, esta funcion es la encargada de reflejar
 * una tarea del estado interno (`tasks`) en el DOM mediante un nuevo
 * `<article>` dentro de `#task-list`.
 *
 * @param {{ id: string, title: string, category: string, priority: string, completed: boolean }} task
 * Tarea que se va a representar en la interfaz.
 * @param {{ applyCurrentFilter?: boolean }} [options={}]
 * Opciones que controlan el renderizado posterior a la insercion.
 * @param {boolean} [options.applyCurrentFilter=true]
 * Si es `true`, vuelve a aplicar el filtro activo para ocultar o mostrar
 * la tarea recien insertada segun el estado actual de la vista.
 * @returns {void}
 *
 * @sideEffects
 * - Crea nuevos elementos del DOM para la tarea.
 * - Inserta el elemento visual en `#task-list` usando `prepend()`.
 * - Guarda la relacion entre la tarea y sus nodos asociados en `taskElements`.
 * - Registra listeners para completar, eliminar y arrastrar la tarea.
 * - Puede actualizar la visibilidad y capacidad de arrastre del listado al
 *   reaplicar el filtro actual.
 */
function addTaskToDOM(task, { applyCurrentFilter = true } = {}) {
  const elements = createTaskElement(task);

  updateTaskStyle(task, elements);
  taskElements.set(task, elements);
  attachTaskEventHandlers(task, elements);
  taskList.prepend(elements.article);

  if (applyCurrentFilter) {
    applyFilter();
  }
}

function renderStoredTasks() {
  tasks.forEach((task) => addTaskToDOM(task, { applyCurrentFilter: false }));
  applyFilter();
}

function setCurrentFilter(filter, activeButton) {
  if (!FILTER_VALUES.has(filter)) {
    return;
  }

  currentFilter = filter;
  applyFilter();
  setActiveNav(activeButton);
}

function attachFilterHandlers() {
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setCurrentFilter(button.dataset.filter, button);
    });
  });
}

attachTaskListDragAndDropHandlers();
attachFilterHandlers();

const savedTheme = getStorageItem(STORAGE_KEYS.theme);
const isDarkTheme = savedTheme === "dark";

if (isDarkTheme) {
  document.body.classList.add("dark");
}

updateThemeButton(isDarkTheme);

themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark");
  setStorageItem(STORAGE_KEYS.theme, isDark ? "dark" : "light");
  updateThemeButton(isDark);
});

tasks = loadTasks();
renderStoredTasks();

setActiveNav(document.querySelector('[data-filter="all"]'));

taskInput.addEventListener("input", () => setTaskFormError());
categoryInput.addEventListener("input", () => setTaskFormError());
priorityInput.addEventListener("change", () => {
  setTaskFormError();
  updatePriorityInputAppearance();
});

updatePriorityInputAppearance();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const validation = validateTaskInput(
    taskInput.value,
    categoryInput.value,
    priorityInput.value
  );

  if (!validation.isValid) {
    setTaskFormError(validation.error);
    return;
  }

  setTaskFormError();
  taskInput.value = validation.title;
  categoryInput.value = validation.category;

  const newTask = normalizeTask({
    id: createTaskId(),
    title: validation.title,
    category: validation.category,
    priority: validation.priority,
    completed: false
  });

  if (!newTask) {
    return;
  }

  tasks.push(newTask);
  saveTasks();
  addTaskToDOM(newTask);

  taskInput.value = "";
  categoryInput.value = "";
  priorityInput.value = "";
  updatePriorityInputAppearance();
  taskInput.focus();
});
