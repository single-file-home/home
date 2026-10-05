try {
    const theme = localStorage.getItem("theme");
    if (theme) {
        document.documentElement.className = theme;
    }
} catch {
    // storage unavailable
}
