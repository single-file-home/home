const CLASS_DARK = "dark-theme";
const CLASS_LIGHT = "light-theme";
const themeButton = document.querySelector(".theme-switcher-button");
const githubWidget = document.querySelector(".github-widget");
const documentElement = document.documentElement;
const darkModeQuery = matchMedia("(prefers-color-scheme: dark)");
themeButton.onclick = () => setTheme(documentElement.className != CLASS_DARK);
themeButton.onkeydown = event => { event.key === "Enter" && setTheme(documentElement.className != CLASS_DARK); };
darkModeQuery.onchange = event => setTheme(event.matches);
setTheme(darkModeQuery.matches);
setGitHubCounter();
themeButton.style.display = "";
document.currentScript.remove();

function setTheme(darkThemeSelected) {
    documentElement.className = darkThemeSelected ? CLASS_DARK : CLASS_LIGHT;
}

async function setGitHubCounter() {
    const response = await fetch("https://api.github.com/repos/gildas-lormeau/SingleFile");
    if (response.ok) {
        const { stargazers_count: stargazersCount } = await response.json();
        const stargazersFormattedCount = Intl.NumberFormat(documentElement.lang).format(stargazersCount);
        githubWidget.appendChild(Object.assign(document.createElement("a"), {
            className: "github-social-count",
            href: "https://github.com/gildas-lormeau/SingleFile/stargazers",
            rel: "noopener",
            target: "_blank",
            textContent: stargazersFormattedCount,
            ariaLabel: `${stargazersCount} stargazers on GitHub`
        }));
    }
}