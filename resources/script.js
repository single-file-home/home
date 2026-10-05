const CLASS_DARK = "dark-theme";
const CLASS_LIGHT = "light-theme";
const themeButton = document.querySelector(".theme-switcher-button");
const githubWidget = document.querySelector(".github-widget");
const documentElement = document.documentElement;
const darkModeQuery = matchMedia("(prefers-color-scheme: dark)");
themeButton.onclick = () => selectTheme(documentElement.className != CLASS_DARK);
themeButton.onkeydown = event => { event.key === "Enter" && selectTheme(documentElement.className != CLASS_DARK); };
darkModeQuery.onchange = event => setTheme(event.matches);
setTheme(getStoredTheme() ?? darkModeQuery.matches);
setGitHubCounter();
setLatestRelease();
themeButton.style.display = "inline";
document.currentScript.remove();

function setTheme(darkThemeSelected) {
    documentElement.className = darkThemeSelected ? CLASS_DARK : CLASS_LIGHT;
}

function selectTheme(darkThemeSelected) {
    setTheme(darkThemeSelected);
    try {
        localStorage.setItem("theme", darkThemeSelected ? CLASS_DARK : CLASS_LIGHT);
    } catch {
        // storage unavailable
    }
}

function getStoredTheme() {
    try {
        const theme = localStorage.getItem("theme");
        return theme ? theme == CLASS_DARK : null;
    } catch {
        return null;
    }
}

async function setGitHubCounter() {
    const response = await fetch("https://api.github.com/repos/gildas-lormeau/SingleFile");
    if (response.ok) {
        const { stargazers_count: stargazersCount } = await response.json();
        githubWidget.appendChild(Object.assign(document.createElement("a"), {
            className: "github-social-count",
            href: "https://github.com/gildas-lormeau/SingleFile/stargazers",
            rel: "noopener",
            target: "_blank",
            textContent: Intl.NumberFormat(documentElement.lang).format(stargazersCount),
            ariaLabel: `${stargazersCount} stargazers on GitHub`
        }));
    }
}

async function setLatestRelease() {
    const response = await fetch("https://api.github.com/repos/gildas-lormeau/SingleFile/releases/latest");
    if (response.ok) {
        const { tag_name: tagName, html_url: htmlUrl } = await response.json();
        const latestRelease = document.querySelector(".latest-release");
        const link = latestRelease.querySelector("a");
        link.textContent = tagName;
        link.href = htmlUrl;
        latestRelease.hidden = false;
    }
}