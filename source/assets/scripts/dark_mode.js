const dark_theme = "dark-theme";

const dark_theme_SetUp = () => {
  if (get_current_theme() === "dark_mode") {
    document.getElementById("toggle").checked = true;
    document.getElementById('main-logo').src = "/admin/branding/icon_darkmode.png";
    document.getElementById('delete-logo').src = "/admin/branding/icon_darkmode.png";
    document.getElementById('add-logo').src = "/admin/branding/icon_darkmode.png";
    document.getElementById('edit-logo').src = "/admin/branding/icon_darkmode.png";
  } else { 
    document.getElementById("toggle").checked = false;
    document.getElementById('main-logo').src = "/admin/branding/icon-transparent.png";
    document.getElementById('delete-logo').src = "/admin/branding/icon-transparent.png";
    document.getElementById('add-logo').src = "/admin/branding/icon-transparent.png";
    document.getElementById('edit-logo').src = "/admin/branding/icon-transparent.png";
  }
};

const get_current_theme = () => 
  document.body.classList.contains(dark_theme) ? "dark_mode" : "light_mode";

const selectedTheme = localStorage.getItem("selected-theme");
if (selectedTheme === "dark_mode") {
  document.body.classList[selectedTheme === "dark_mode" ? "add" : "remove"](
    dark_theme
  );
  dark_theme_SetUp();
}

const theme_button = document.getElementById("toggle");
theme_button.addEventListener("change", () => {
  document.body.classList.toggle(dark_theme);
  localStorage.setItem("selected-theme", get_current_theme());
  dark_theme_SetUp();
});