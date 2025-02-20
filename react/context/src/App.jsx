import { createContext, useContext, useState, useMemo, memo } from "react";

// 1. Create context
const ThemeContext = createContext();

// 2. Create theme provider
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  
  // 3. Memoize context value to prevent re-renders unless theme changes
  const value = useMemo(() => ({ theme, setTheme }), [theme]);

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

// 4. Memoize child component to prevent re-renders
const ThemedButton = memo(() => {
  const { theme, setTheme } = useContext(ThemeContext);
  return (
    <button
      style={{
        backgroundColor: theme === "light" ? "#fff" : "#333",
        color: theme === "light" ? "#000" : "#fff",
      }}
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      Toggle theme
    </button>
  );
});

function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}

export default App;
