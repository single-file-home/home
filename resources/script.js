const CLASS_DARK = "dark-theme";
const CLASS_LIGHT = "light-theme";
const STYLE_TRANSFORM_ICON_DARK = "rotate(180deg)";
const STYLE_TRANSFORM_ICON_LIGHT = "";
const themeButton = document.querySelector("svg");
const documentElement = document.documentElement;
const darkModeQuery = matchMedia("(prefers-color-scheme: dark)");
themeButton.addEventListener("click", () => setTheme(documentElement.className != CLASS_DARK));
themeButton.addEventListener("keydown", event => event.key === "Enter" && setTheme(documentElement.className != CLASS_DARK));
darkModeQuery.addEventListener("change", event => setTheme(event.matches));
setTheme(darkModeQuery.matches);
setGitHubCounter();
themeButton.style.display = "";
document.currentScript.remove();

function setTheme(darkThemeSelected) {
    documentElement.className = darkThemeSelected ? CLASS_DARK : CLASS_LIGHT;
    themeButton.style.transform = darkThemeSelected ? STYLE_TRANSFORM_ICON_DARK : STYLE_TRANSFORM_ICON_LIGHT;
}

async function setGitHubCounter() {
    const response = await fetch("https://api.github.com/repos/gildas-lormeau/SingleFile");
    if (response.ok) {
        const { stargazers_count } = await response.json();
        const count = Intl.NumberFormat().format(stargazers_count);
        const githubWidget = document.querySelector(".github-widget");
        const counterButton = document.createElement("a");
        counterButton.classList.add("social-count");
        counterButton.href = "https://github.com/gildas-lormeau/SingleFile/stargazers";
        counterButton.rel = "noopener";
        counterButton.target = "_blank";
        githubWidget.appendChild(counterButton);
        counterButton.textContent = count;
        counterButton.ariaLabel = `${stargazers_count} stargazers on GitHub`;
    }
}