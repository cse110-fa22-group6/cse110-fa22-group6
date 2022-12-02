const dark_theme = "dark-theme";

const darktheme_setup = () => {
  if (get_current_theme() === "dark_mode") {
    document.getElementById("toggle").checked = true;
    document.getElementById("main-logo").src = "/admin/branding/icon_darkmode.png";
    document.getElementById("delete-logo").src = "/admin/branding/icon_darkmode.png";
    document.getElementById("add-logo").src = "/admin/branding/icon_darkmode.png";
    document.getElementById("edit-logo").src = "/admin/branding/icon_darkmode.png";
  } else { 
    document.getElementById("toggle").checked = false;
    document.getElementById("main-logo").src = "/admin/branding/icon-transparent.png";
    document.getElementById("delete-logo").src = "/admin/branding/icon-transparent.png";
    document.getElementById("add-logo").src = "/admin/branding/icon-transparent.png";
    document.getElementById("edit-logo").src = "/admin/branding/icon-transparent.png";
  }
};

const get_current_theme = () =>
  document.body.classList.contains(dark_theme) ? "dark_mode" : "light_mode";

const selected_theme = localStorage.getItem("selected-theme");
if (selected_theme === "dark_mode") {
  document.body.classList[selected_theme === "dark_mode" ? "add" : "remove"](
    dark_theme
  );
  darktheme_setup();
}

const theme_button = document.getElementById("toggle");
theme_button.addEventListener("change", () => {
  document.body.classList.toggle(dark_theme);
  localStorage.setItem("selected-theme", get_current_theme());
  darktheme_setup();
});