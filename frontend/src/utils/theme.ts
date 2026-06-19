import { computed, ref, watch } from "vue";

export type ThemeMode = "light" | "dark";
const STORAGE_KEY = "app-theme";

const getStoredTheme = (): ThemeMode | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedValue = localStorage.getItem(STORAGE_KEY);
  return storedValue === "dark" || storedValue === "light" ? (storedValue as ThemeMode) : null;
};

const getPreferredTheme = (): ThemeMode => {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const initialTheme: ThemeMode = getStoredTheme() ?? getPreferredTheme();

const theme = ref<ThemeMode>(initialTheme);

const updateDocumentTheme = (value: ThemeMode) => {
  if (typeof document === "undefined") {
    return;
  }

  if (value === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  document.documentElement.dataset.theme = value;
};

updateDocumentTheme(theme.value);

watch(theme, (newTheme) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, newTheme);
  }

  updateDocumentTheme(newTheme);
});

const isDark = computed(() => theme.value === "dark");

function useTheme() {
  const toggleTheme = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  };

  const setTheme = (value: ThemeMode) => {
    theme.value = value;
  };

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme,
  };
}

export { theme, isDark, useTheme };
