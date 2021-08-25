// menu superior
const select_li_top = (li_top_obj) => {
	clear_all_li_top();
	li_top_obj.classList.add("active");
}

const clear_all_li_top = () => {
	const all_li_top = document.getElementsByClassName("li_top");
	for (li of all_li_top){
		li.classList.remove("active");
	}
}

const get_li_top_screen = (li_top_obj) => {
    const screen_id = li_top_obj.getAttribute("data-screen-id");
    return document.getElementById(screen_id);
}

// Telas
const show_screen = (screen_obj) => {
	clear_all_screen();
	screen_obj.classList.add("show");
}

const clear_all_screen = () => {
	const all_screen = document.getElementsByClassName("screen");
	for (screen of all_screen){
		screen.classList.remove("show");
	}
}

const get_screen_li_left_list = (screen_obj) => {
    return screen_obj.querySelectorAll(".li_left");
}

const get_screen_first_li_left = (screen_obj) => {
    return screen_obj.querySelector(".li_left");
}

const get_screen_li_top = (screen_obj) => {
    const screen_id = screen_obj.id;
    return document.querySelector("[data-screen-id="+screen_id+"]");
}

// Menu lateral
const select_li_left = (li_left_obj) =>{
	clear_all_li_left();
	li_left_obj.classList.add("active");
}

const clear_all_li_left = () => {
	const all_li_left = document.getElementsByClassName("li_left");
	for (li of all_li_left){
		li.classList.remove("active");
	}
}

const get_li_left_section = (li_left_obj) => {
    const section_id = li_left_obj.getAttribute("data-section-id");
    return document.getElementById(section_id);
}

const get_li_left_screen = (li_left_obj) => {
    return li_left_obj.parentElement.parentElement.parentElement.parentElement;
}

// Seções
const show_section = (section_obj) => {
	clear_all_section();
	section_obj.classList.add("show");
	if (section_not_loaded(section_obj)){
	    get_section_html(section_obj, get_section_path(section_obj))
	    remove_not_loaded(section_obj);
	}
}

const clear_all_section = () => {
	const all_section = document.getElementsByTagName("section");
	for (section of all_section){
		section.classList.remove("show");
	}
}

const get_section_li_left = (section_obj) => {
    const section_id = section_obj.id;
    return document.querySelector("[data-section-id="+section_id+"]");
}


const get_section_html = async (section_obj, section_path) => {
	const response = await fetch(section_path+"/index.html");
	section_obj.innerHTML = await response.text();
}

const get_section_path = (section_obj) => {
    return section_obj.getAttribute("data-section-path");
}

const get_section_url_path = (section_obj) => {
    return section_obj.getAttribute("data-url-path");
}

const section_not_loaded = (section_obj) => {
    return section_obj.classList.contains("not_loaded")
}

const remove_not_loaded = (section_obj) => {
    section_obj.classList.remove("not_loaded");
}

// Mostra página
const show_page = (section_obj) => {
    const li_left = get_section_li_left(section_obj);
    const screen = get_li_left_screen(li_left);
    const li_top = get_screen_li_top(screen);
    select_li_top(li_top);
    show_screen(screen);
    select_li_left(li_left);
    show_section(section_obj);
}

const set_new_url_path = (new_path) => {
    window.history.pushState(new_path, new_path, new_path);
    show_page(url_section());
}

// clicks na página
const activate_li_left_click = () => {
	const all_li_left = document.getElementsByClassName("li_left");
    for (li of all_li_left){
        li.addEventListener("click", function(){
            click_li_left(this);
        });
    }
}

const click_li_left = (li_left_obj) => {
    const new_path = "/" + li_left_obj.getAttribute("data-section-id");
    set_new_url_path(new_path);
}

const activate_li_top_click = () => {
	const all_li_top = document.getElementsByClassName("li_top");
    for (li of all_li_top){
        li.addEventListener("click", function(){
            click_li_top(this);
        });
    }
}

const click_li_top = (li_top_obj) => {
    const screen = get_li_top_screen(li_top_obj);
    const li_left = get_screen_first_li_left(screen);
    click_li_left (li_left);
}

// Busca rotas na URL
redirect_list = {"": 0, "/": 0};

const url_section = () => {
    let url_path = window.location.pathname;
    if (url_path in redirect_list){
        const new_section = document.getElementsByTagName("section")[redirect_list[url_path]]
        const new_path = "/" + new_section.id;
        return set_new_url_path(new_path);
    }
    if (url_path.charAt(0) == "/"){url_path = url_path.substring(1);} //remove "/" do início da string
    return document.querySelector("[id="+url_path+"]");
}

// Inicia página
activate_li_left_click();
activate_li_top_click();
show_page(url_section());
