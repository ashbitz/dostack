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
const CATEGORY_OPTIONS = [
  { value: "\u{1F4BC} Trabajo", labelHtml: "&#128188; Trabajo" },
  { value: "\u{1F3E0} Hogar", labelHtml: "&#127968; Hogar" },
  { value: "\u{1F4D6} Estudio", labelHtml: "&#128214; Estudio" },
  { value: "\u2708\uFE0F Ocio", labelHtml: "&#9992;&#65039; Ocio" },
  { value: "\u{1F464} Personal", labelHtml: "&#128100; Personal" },
  { value: "\u{1F691} Salud", labelHtml: "&#128657; Salud" },
  { value: "\u{1F31F} Otra", labelHtml: "&#127775; Otra" }
];
const VALID_CATEGORIES = new Set(
  CATEGORY_OPTIONS.map((category) => category.value)
);
const MOON_ICON = "\u{1F311}";
const SUN_ICON = "\u2600\uFE0F";
const CHECK_ICON_DATA_URI =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none' stroke='white' stroke-width='2.75' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M5 10.5l3 3 7-7'/%3E%3C/svg%3E\")";

const ACTIVE_CATEGORY_NAV_CLASSES = ["bg-slate-100", "dark:bg-slate-700"];
const CATEGORY_PLACEHOLDER_CLASSES = ["text-slate-400", "dark:text-slate-500"];
const CATEGORY_VALUE_CLASSES = ["text-slate-900", "dark:text-slate-100"];
const PRIORITY_PLACEHOLDER_CLASSES = ["text-slate-400", "dark:text-slate-500"];
const PRIORITY_VALUE_CLASSES = ["text-slate-900", "dark:text-slate-100"];
const PRIORITY_CLASS_NAMES = {
  alta: "bg-red-100 text-red-700",
  media: "bg-yellow-100 text-yellow-700",
  baja: "bg-green-100 text-green-700"
};
const TASK_CLASS_NAMES = {
  articleBase:
    "mb-3 rounded-lg border px-3 py-2 shadow-sm transition-transform hover:-translate-y-[2px] hover:shadow-lg",
  article: {
    active: "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-800",
    completed:
      "border-slate-200 bg-slate-100 opacity-70 dark:border-slate-600 dark:bg-slate-700"
  },
  layout:
    "grid grid-cols-[auto_minmax(0,1fr)_auto] grid-rows-3 items-start gap-x-3 gap-y-1 md:grid-cols-[auto_4.5rem_24ch_4.5rem_auto_minmax(0,1fr)] md:grid-rows-1 md:items-center md:gap-x-0 md:gap-y-0",
  checkboxSlot:
    "col-start-1 row-start-2 flex items-center self-center md:row-start-auto",
  textStack:
    "col-start-2 row-start-1 row-span-2 min-w-0 grid grid-rows-2 gap-y-1 md:col-start-3 md:row-start-auto md:row-span-1 md:w-[24ch]",
  textLine: "flex min-h-8 min-w-0 items-center",
  prioritySlot:
    "col-start-2 row-start-3 flex min-h-8 items-center self-center justify-self-start md:col-start-5 md:row-start-auto",
  actionSlot:
    "col-start-3 row-start-1 row-span-3 flex min-h-8 items-stretch justify-end self-stretch md:col-start-6 md:row-start-auto md:row-span-1 md:items-center md:self-center",
  title: {
    active:
      "block min-w-0 truncate text-left text-[1.05rem] leading-6 font-semibold text-slate-900 dark:text-slate-100",
    completed:
      "block min-w-0 truncate text-left text-[1.05rem] leading-6 font-semibold text-slate-500 line-through dark:text-slate-400"
  },
  category: {
    active:
      "block min-w-0 truncate text-left text-sm leading-5 italic text-slate-500 dark:text-slate-300",
    completed:
      "block min-w-0 truncate text-left text-sm leading-5 italic text-slate-400 line-through dark:text-slate-500"
  },
  checkbox:
    "h-8 w-8 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-slate-300 bg-white bg-center bg-no-repeat bg-[length:1rem_1rem] transition checked:border-indigo-500 checked:bg-indigo-500 focus:outline-none dark:border-slate-500 dark:bg-slate-800",
  badge:
    "inline-flex min-h-8 w-fit shrink-0 items-center rounded-full px-3 py-1.5 text-sm font-semibold",
  actions:
    "flex h-full w-full shrink-0 flex-col-reverse items-end justify-between gap-1 md:h-auto md:flex-row md:items-center md:justify-end",
  editForm: "flex flex-col gap-2",
  editTitleInput:
    "h-7 w-full min-w-0 rounded-md border border-gray-300 px-2.5 text-[0.95rem] text-slate-900 outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100",
  editCategoryInput:
    "h-7 w-full min-w-0 rounded-md border border-gray-300 px-2.5 text-xs italic text-slate-900 outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100",
  editSelect:
    "h-8 w-full rounded-full border border-gray-300 px-3 text-sm text-slate-900 outline-none focus:ring-2 focus:ring-indigo-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100",
  editButtons:
    "w-full flex h-full flex-col items-end justify-between gap-2 md:h-auto md:flex-row md:items-center md:justify-end",
  editPrimaryButton:
    "h-8 rounded-lg bg-indigo-500 px-3 text-sm font-semibold text-white transition hover:bg-indigo-600",
  editSecondaryButton:
    "h-8 rounded-lg border border-slate-300 px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-slate-700",
  editError: "text-sm font-medium text-red-600 dark:text-red-400",
  editButton:
    "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-xl leading-none text-gray-500 transition-colors hover:border-indigo-200 hover:text-indigo-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300",
  deleteButton:
    "flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full border border-slate-200 bg-white text-gray-500 transition-colors hover:border-red-200 hover:text-red-500 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-300",
  deleteIcon: "h-[1.35rem] w-[1.35rem] shrink-0 stroke-current"
};
const TASK_FIELD_MESSAGES = {
  title: {
    required: "El titulo es obligatorio.",
    min: "El titulo debe tener al menos 3 caracteres.",
    max: "El titulo no puede superar los 20 caracteres."
  },
  category: {
    required: "La categoria es obligatoria."
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
const taskSearchInput = document.querySelector("#task-search-input");
const taskPriorityFilter = document.querySelector("#task-priority-filter");
const taskStatusFilter = document.querySelector("#task-status-filter");
const completeAllBtn = document.querySelector("#complete-all-btn");
const categoryAsideList = document.querySelector("#category-aside-list");
const taskFormError = document.querySelector("#task-form-error");
const taskList = document.querySelector("#task-list");
const themeToggle = document.querySelector("#theme-toggle");

let tasks = [];
let currentFilter = "all";
let currentSearchTerm = "";
let currentCategoryFilter = "all";
let currentPriorityFilter = "all";
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

function normalizeCategoryValue(value) {
  const normalizedValue = normalizeTextValue(value);

  if (!normalizedValue) {
    return "";
  }

  const exactMatch = CATEGORY_OPTIONS.find(
    (category) => category.value.toLowerCase() === normalizedValue.toLowerCase()
  );
  if (exactMatch) {
    return exactMatch.value;
  }

  const textOnlyMatch = CATEGORY_OPTIONS.find((category) => {
    const textOnlyValue = category.value
      .replace(/^[^\p{L}\p{N}]+/u, "")
      .trim()
      .toLowerCase();

    return textOnlyValue === normalizedValue.toLowerCase();
  });

  return textOnlyMatch?.value ?? "";
}

function createCategoryOptions(
  selectElement,
  {
    includePlaceholder = false,
    placeholderLabel = "Categoria",
    placeholderValue = "",
    placeholderDisabled = true
  } = {}
) {
  selectElement.innerHTML = "";

  if (includePlaceholder) {
    const placeholderOption = document.createElement("option");
    placeholderOption.value = placeholderValue;
    placeholderOption.disabled = placeholderDisabled;
    placeholderOption.selected = true;
    placeholderOption.textContent = placeholderLabel;
    selectElement.append(placeholderOption);
  }

  CATEGORY_OPTIONS.forEach((category) => {
    const option = document.createElement("option");
    option.value = category.value;
    option.innerHTML = category.labelHtml;
    selectElement.append(option);
  });
}

function normalizeTask(rawTask) {
  if (!rawTask || typeof rawTask !== "object") {
    return null;
  }

  const title = normalizeTextValue(rawTask.title);
  const category = normalizeCategoryValue(rawTask.category);
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

function setActiveCategoryNav(activeButton) {
  const categoryButtons = document.querySelectorAll("[data-category-filter]");

  categoryButtons.forEach((button) => {
    button.classList.remove(...ACTIVE_CATEGORY_NAV_CLASSES);
    button.setAttribute("aria-pressed", String(button === activeButton));
  });

  if (activeButton) {
    activeButton.classList.add(...ACTIVE_CATEGORY_NAV_CLASSES);
  }
}

function syncCategoryFilterUI() {
  const activeCategoryButton = document.querySelector(
    `[data-category-filter="${CSS.escape(currentCategoryFilter)}"]`
  );
  setActiveCategoryNav(activeCategoryButton);
}

function setCurrentCategoryFilter(category) {
  currentCategoryFilter = category;
  currentFilter = "all";
  currentPriorityFilter = "all";
  currentSearchTerm = "";

  if (taskStatusFilter) {
    taskStatusFilter.value = "all";
  }

  if (taskPriorityFilter) {
    taskPriorityFilter.value = "all";
  }

  if (taskSearchInput) {
    taskSearchInput.value = "";
  }

  syncCategoryFilterUI();
  applyFilter();
}

function setCurrentFilter(filter) {
  if (!FILTER_VALUES.has(filter)) {
    return;
  }

  currentFilter = filter;

  if (taskStatusFilter) {
    taskStatusFilter.value = filter;
  }

  applyFilter();
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

function matchesCategoryFilter(task) {
  return currentCategoryFilter === "all" || task.category === currentCategoryFilter;
}

function matchesPriorityFilter(task) {
  return currentPriorityFilter === "all" || task.priority === currentPriorityFilter;
}

function matchesSearch(task) {
  if (!currentSearchTerm) {
    return true;
  }

  return [task.title, task.category].some((value) =>
    value.toLowerCase().includes(currentSearchTerm)
  );
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

    elements.article.hidden = !(
      isTaskVisible(task) &&
      matchesSearch(task) &&
      matchesCategoryFilter(task) &&
      matchesPriorityFilter(task)
    );
  });

  updateTaskDraggability();
}

function updateTaskDraggability() {
  const canReorderTasks =
    currentFilter === "all" &&
    !currentSearchTerm &&
    currentCategoryFilter === "all" &&
    currentPriorityFilter === "all";

  if (!canReorderTasks) {
    clearDragIndicator();
    draggedTaskId = null;
  }

  tasks.forEach((task) => {
    const elements = taskElements.get(task);
    if (!elements) {
      return;
    }

    const canReorderCurrentTask =
      canReorderTasks && elements.article.dataset.editing !== "true";

    elements.article.draggable = canReorderCurrentTask;
    elements.article.style.cursor = canReorderCurrentTask ? "grab" : "";

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

function validateCategoryField(value, { required }) {
  const normalizedValue = normalizeCategoryValue(value);

  if (!normalizedValue || !VALID_CATEGORIES.has(normalizedValue)) {
    return createValidationError(required);
  }

  return createValidationSuccess(normalizedValue);
}

/**
 * Valida y normaliza los valores introducidos para crear una nueva tarea.
 *
 * @param {string} title Titulo introducido por la persona usuaria.
 * @param {string} category Categoria introducida por la persona usuaria.
 * @param {string} priority Prioridad seleccionada por la persona usuaria.
 * @param {string | null} [excludedTaskId=null] Identificador de tarea que se excluye de la comprobacion de duplicados.
 * @returns {{ isValid: false, error: string } | { isValid: true, title: string, category: string, priority: string }} Resultado de la validacion.
 */
function validateTaskInput(title, category, priority, excludedTaskId = null) {
  const titleResult = validateTextField(title, TASK_FIELD_MESSAGES.title);
  if (!titleResult.isValid) {
    return titleResult;
  }

  const categoryResult = validateCategoryField(
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
    (task) =>
      task.id !== excludedTaskId &&
      task.title.toLowerCase() === normalizedTitle.toLowerCase()
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

function updateCategoryInputAppearance() {
  const hasSelectedCategory = VALID_CATEGORIES.has(categoryInput.value);

  CATEGORY_PLACEHOLDER_CLASSES.forEach((className) => {
    categoryInput.classList.toggle(className, !hasSelectedCategory);
  });

  CATEGORY_VALUE_CLASSES.forEach((className) => {
    categoryInput.classList.toggle(className, hasSelectedCategory);
  });
}

function formatPriorityLabel(priority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1);
}

function updateCheckboxAppearance(checkbox) {
  checkbox.style.backgroundImage = checkbox.checked ? CHECK_ICON_DATA_URI : "none";
}

function updateTaskContent(task, elements) {
  elements.title.textContent = task.title;
  elements.category.textContent = task.category;
  elements.badge.className = `${TASK_CLASS_NAMES.badge} ${getPriorityClasses(task.priority)}`;
  elements.badge.textContent = formatPriorityLabel(task.priority);
  elements.checkbox.setAttribute(
    "aria-label",
    `Marcar tarea ${task.title} como completada`
  );
  elements.editBtn.setAttribute("aria-label", `Editar tarea ${task.title}`);
  elements.deleteBtn.setAttribute("aria-label", `Eliminar tarea ${task.title}`);
}

function setTaskEditError(elements, message = "") {
  elements.editError.textContent = message;
  elements.editError.hidden = !message;
}

function setTaskEditMode(task, elements, isEditing) {
  elements.article.dataset.editing = String(isEditing);
  elements.title.hidden = isEditing;
  elements.editTitleInput.hidden = !isEditing;
  elements.category.hidden = isEditing;
  elements.editCategoryInput.hidden = !isEditing;
  elements.badge.hidden = isEditing;
  elements.editPriorityInput.hidden = !isEditing;
  elements.actions.hidden = isEditing;
  elements.editActions.hidden = !isEditing;
  elements.editBtn.setAttribute("aria-pressed", String(isEditing));
  elements.checkbox.disabled = isEditing;
  elements.checkbox.style.opacity = isEditing ? "0.5" : "";
  elements.checkbox.style.filter = isEditing ? "grayscale(1)" : "";
  elements.checkbox.style.cursor = isEditing ? "not-allowed" : "";

  updateTaskStyle(
    isEditing ? { ...task, completed: false } : task,
    elements
  );

  if (!isEditing) {
    setTaskEditError(elements);
  }

  updateTaskDraggability();
}

function populateTaskEditor(task, elements) {
  elements.editTitleInput.value = task.title;
  elements.editCategoryInput.value = task.category;
  elements.editPriorityInput.value = task.priority;
}

function closeAllTaskEditors(excludedTaskId = null) {
  tasks.forEach((task) => {
    if (task.id === excludedTaskId) {
      return;
    }

    const elements = taskElements.get(task);
    if (!elements || elements.article.dataset.editing !== "true") {
      return;
    }

    setTaskEditMode(task, elements, false);
  });
}

/**
 * Crea los elementos del DOM necesarios para representar una tarea.
 *
 * @param {{ id: string, title: string, category: string, priority: string, completed: boolean }} task Tarea a representar.
 * @returns {{ article: HTMLElement, checkbox: HTMLInputElement, title: HTMLSpanElement, category: HTMLSpanElement, badge: HTMLSpanElement, actions: HTMLDivElement, editActions: HTMLDivElement, editForm: HTMLFormElement, editTitleInput: HTMLInputElement, editCategoryInput: HTMLInputElement, editPriorityInput: HTMLSelectElement, editError: HTMLParagraphElement, editBtn: HTMLButtonElement, cancelEditBtn: HTMLButtonElement, saveEditBtn: HTMLButtonElement, deleteBtn: HTMLButtonElement }} Elementos creados para la tarea.
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
  updateCheckboxAppearance(checkbox);

  const editForm = document.createElement("form");
  editForm.className = TASK_CLASS_NAMES.editForm;

  const layout = document.createElement("div");
  layout.className = TASK_CLASS_NAMES.layout;

  const checkboxSlot = document.createElement("div");
  checkboxSlot.className = TASK_CLASS_NAMES.checkboxSlot;

  const textStack = document.createElement("div");
  textStack.className = TASK_CLASS_NAMES.textStack;

  const titleLine = document.createElement("div");
  titleLine.className = TASK_CLASS_NAMES.textLine;

  const title = document.createElement("span");
  title.textContent = task.title;

  const editTitleInput = document.createElement("input");
  editTitleInput.type = "text";
  editTitleInput.value = task.title;
  editTitleInput.className = TASK_CLASS_NAMES.editTitleInput;
  editTitleInput.autocomplete = "off";
  editTitleInput.required = true;
  editTitleInput.setAttribute("aria-label", `Editar titulo de ${task.title}`);
  editTitleInput.hidden = true;

  const categoryLine = document.createElement("div");
  categoryLine.className = TASK_CLASS_NAMES.textLine;

  const category = document.createElement("span");
  category.textContent = task.category;

  const editCategoryInput = document.createElement("select");
  editCategoryInput.className = TASK_CLASS_NAMES.editCategoryInput;
  editCategoryInput.required = true;
  editCategoryInput.setAttribute("aria-label", `Editar categoria de ${task.title}`);
  editCategoryInput.hidden = true;
  createCategoryOptions(editCategoryInput);
  editCategoryInput.value = task.category;

  const prioritySlot = document.createElement("div");
  prioritySlot.className = TASK_CLASS_NAMES.prioritySlot;

  const badge = document.createElement("span");
  badge.className = `${TASK_CLASS_NAMES.badge} ${getPriorityClasses(task.priority)}`;
  badge.textContent = formatPriorityLabel(task.priority);

  const editPriorityInput = document.createElement("select");
  editPriorityInput.className = TASK_CLASS_NAMES.editSelect;
  editPriorityInput.setAttribute("aria-label", `Editar prioridad de ${task.title}`);
  editPriorityInput.hidden = true;

  ["alta", "media", "baja"].forEach((priority) => {
    const option = document.createElement("option");
    option.value = priority;
    option.textContent = formatPriorityLabel(priority);
    option.selected = priority === task.priority;
    editPriorityInput.append(option);
  });

  const saveEditBtn = document.createElement("button");
  saveEditBtn.type = "submit";
  saveEditBtn.textContent = "Guardar";
  saveEditBtn.className = TASK_CLASS_NAMES.editPrimaryButton;

  const cancelEditBtn = document.createElement("button");
  cancelEditBtn.type = "button";
  cancelEditBtn.textContent = "Cancelar";
  cancelEditBtn.className = TASK_CLASS_NAMES.editSecondaryButton;

  const actionSlot = document.createElement("div");
  actionSlot.className = TASK_CLASS_NAMES.actionSlot;

  const actions = document.createElement("div");
  actions.className = TASK_CLASS_NAMES.actions;

  const editBtn = document.createElement("button");
  editBtn.type = "button";
  editBtn.textContent = "\u270E";
  editBtn.className = TASK_CLASS_NAMES.editButton;
  editBtn.setAttribute("aria-label", `Editar tarea ${task.title}`);

  const deleteBtn = document.createElement("button");
  deleteBtn.type = "button";
  deleteBtn.className = TASK_CLASS_NAMES.deleteButton;
  deleteBtn.setAttribute("aria-label", `Eliminar tarea ${task.title}`);

  const deleteIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  deleteIcon.setAttribute("viewBox", "0 0 20 20");
  deleteIcon.setAttribute("fill", "none");
  deleteIcon.setAttribute("aria-hidden", "true");
  deleteIcon.classList.add(...TASK_CLASS_NAMES.deleteIcon.split(" "));

  const deleteIconPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  deleteIconPath.setAttribute("d", "M6 6l8 8M14 6l-8 8");
  deleteIconPath.setAttribute("stroke-linecap", "round");
  deleteIconPath.setAttribute("stroke-linejoin", "round");
  deleteIconPath.setAttribute("stroke-width", "2.8");

  deleteIcon.append(deleteIconPath);
  deleteBtn.append(deleteIcon);

  const editButtons = document.createElement("div");
  editButtons.className = TASK_CLASS_NAMES.editButtons;
  editButtons.hidden = true;

  const editError = document.createElement("p");
  editError.className = TASK_CLASS_NAMES.editError;
  editError.setAttribute("aria-live", "assertive");
  editError.hidden = true;

  titleLine.append(title, editTitleInput);
  categoryLine.append(category, editCategoryInput);
  textStack.append(titleLine, categoryLine);
  prioritySlot.append(badge, editPriorityInput);
  actions.append(editBtn, deleteBtn);
  editButtons.append(saveEditBtn, cancelEditBtn);
  actionSlot.append(actions, editButtons);
  checkboxSlot.append(checkbox);
  layout.append(checkboxSlot, textStack, prioritySlot, actionSlot);
  editForm.append(layout, editError);
  article.append(editForm);

  return {
    article,
    checkbox,
    title,
    category,
    badge,
    actions,
    editActions: editButtons,
    editForm,
    editTitleInput,
    editCategoryInput,
    editPriorityInput,
    editError,
    editBtn,
    cancelEditBtn,
    saveEditBtn,
    deleteBtn
  };
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

function syncTaskCompletionState(task, elements) {
  elements.checkbox.checked = task.completed;
  updateCheckboxAppearance(elements.checkbox);

  if (elements.article.dataset.editing === "true") {
    updateTaskStyle({ ...task, completed: false }, elements);
    return;
  }

  updateTaskStyle(task, elements);
}

function commitTasksChange() {
  saveTasks();
  applyFilter();
}

/**
 * Registra los eventos necesarios para completar o eliminar una tarea desde la interfaz.
 *
 * @param {{ id: string, completed: boolean }} task Tarea asociada a los eventos.
 * @param {{ article: HTMLElement, checkbox: HTMLInputElement, title: HTMLSpanElement, category: HTMLSpanElement, badge: HTMLSpanElement, actions: HTMLDivElement, editActions: HTMLDivElement, editForm: HTMLFormElement, editTitleInput: HTMLInputElement, editCategoryInput: HTMLInputElement, editPriorityInput: HTMLSelectElement, editError: HTMLParagraphElement, editBtn: HTMLButtonElement, cancelEditBtn: HTMLButtonElement, saveEditBtn: HTMLButtonElement, deleteBtn: HTMLButtonElement }} elements Elementos interactivos de la tarea.
 * @returns {void}
 */
function attachTaskEventHandlers(task, elements) {
  const {
    article,
    checkbox,
    editForm,
    editTitleInput,
    editCategoryInput,
    editPriorityInput,
    editBtn,
    cancelEditBtn,
    deleteBtn
  } = elements;

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
    syncTaskCompletionState(task, elements);
    commitTasksChange();
  });

  editBtn.addEventListener("click", () => {
    const isEditing = article.dataset.editing === "true";

    if (isEditing) {
      setTaskEditMode(task, elements, false);
      return;
    }

    closeAllTaskEditors(task.id);
    populateTaskEditor(task, elements);
    setTaskEditError(elements);
    setTaskEditMode(task, elements, true);
    editTitleInput.focus();
  });

  cancelEditBtn.addEventListener("click", () => {
    populateTaskEditor(task, elements);
    setTaskEditMode(task, elements, false);
  });

  editTitleInput.addEventListener("input", () => setTaskEditError(elements));
  editCategoryInput.addEventListener("change", () => setTaskEditError(elements));
  editPriorityInput.addEventListener("change", () => setTaskEditError(elements));

  editForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const validation = validateTaskInput(
      editTitleInput.value,
      editCategoryInput.value,
      editPriorityInput.value,
      task.id
    );

    if (!validation.isValid) {
      setTaskEditError(elements, validation.error);
      return;
    }

    task.title = validation.title;
    task.category = validation.category;
    task.priority = validation.priority;
    updateTaskContent(task, elements);
    updateTaskStyle(task, elements);
    setTaskEditMode(task, elements, false);
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

function renderCategoryAsideFilters() {
  if (!categoryAsideList) {
    return;
  }

  const allCategoriesButton = categoryAsideList.querySelector(
    '[data-category-filter="all"]'
  );

  if (allCategoriesButton) {
    allCategoriesButton.addEventListener("click", () => {
      setCurrentCategoryFilter("all");
    });
  }

  CATEGORY_OPTIONS.forEach((category) => {
    const listItem = document.createElement("li");
    const button = document.createElement("button");

    button.type = "button";
    button.dataset.categoryFilter = category.value;
    button.setAttribute("aria-controls", "task-list");
    button.setAttribute("aria-pressed", "false");
    button.className =
      "category-aside-link inline-flex w-full items-center rounded-lg px-2 py-1 text-slate-900 transition-colors hover:bg-slate-100 hover:text-slate-900 dark:text-slate-100 dark:hover:bg-slate-700 dark:hover:text-slate-100";
    button.innerHTML = category.labelHtml;
    button.addEventListener("click", () => {
      setCurrentCategoryFilter(category.value);
    });

    listItem.append(button);
    categoryAsideList.append(listItem);
  });
}

renderCategoryAsideFilters();
attachTaskListDragAndDropHandlers();

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

taskInput.addEventListener("input", () => setTaskFormError());
createCategoryOptions(categoryInput, { includePlaceholder: true });
updateCategoryInputAppearance();
syncCategoryFilterUI();
taskStatusFilter.value = currentFilter;

categoryInput.addEventListener("change", () => {
  setTaskFormError();
  updateCategoryInputAppearance();
});
taskPriorityFilter.addEventListener("change", () => {
  currentPriorityFilter = taskPriorityFilter.value;
  applyFilter();
});
taskStatusFilter.addEventListener("change", () => {
  setCurrentFilter(taskStatusFilter.value);
});
priorityInput.addEventListener("change", () => {
  setTaskFormError();
  updatePriorityInputAppearance();
});

updatePriorityInputAppearance();

taskSearchInput.addEventListener("input", () => {
  currentSearchTerm = normalizeTextValue(taskSearchInput.value).toLowerCase();
  applyFilter();
});

completeAllBtn.addEventListener("click", () => {
  let hasChanges = false;

  tasks.forEach((task) => {
    if (task.completed) {
      return;
    }

    task.completed = true;
    hasChanges = true;

    const elements = taskElements.get(task);
    if (elements) {
      syncTaskCompletionState(task, elements);
    }
  });

  if (!hasChanges) {
    return;
  }

  commitTasksChange();
});

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
  updateCategoryInputAppearance();
  updatePriorityInputAppearance();
  taskInput.focus();
});
