document.addEventListener("DOMContentLoaded", () => {
    fetch("https://brendonkupsch1.github.io/SD330/foxbooks.json")
        .then((response) => response.json())
        .then((data) => {
            if (document.querySelector("#courses")) {
                displayCourses(data.courses);
            } else if (document.querySelector("#course-title")) {
                displayCourse(data.courses);
            } else if (document.querySelector("#cart-items")) {
                displayCart();
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
});

function displayCourses(courses) {
    const container = document.querySelector("#courses");
    courses.forEach((course) => {
        const courseDiv = document.createElement("div");
        courseDiv.classList.add("course");
        const courseLink = document.createElement("a");
        courseLink.href = `course.html?id=${course.id}`;
        courseLink.textContent = course.title;
        courseDiv.appendChild(courseLink);
        container.appendChild(courseDiv);
    });
}


function displayCourse(courses) {
    const courseId = new URLSearchParams(window.location.search).get("id");
    const course = courses.find((c) => c.id === courseId);
    document.querySelector("#course-title").textContent = course.title;
    const container = document.querySelector("#books");
    course.books.forEach((book) => {
        const bookDiv = document.createElement("div");
        bookDiv.classList.add("book");
        const title = document.createElement("h3");
        title.textContent = book.title;
        bookDiv.appendChild(title);
        const addButton = document.createElement("button");
        addButton.textContent = "Add to cart";
        addButton.onclick = () => addToCart(book);
        bookDiv.appendChild(addButton);
        container.appendChild(bookDiv);
    });
}

function addToCart(book) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push(book);
    localStorage.setItem("cart", JSON.stringify(cart));
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const container = document.querySelector("#cart-items");
    container.innerHTML = ""; // Clear the container
    cart.forEach((item, index) => {
        const cartItemDiv = document.createElement("div");
        cartItemDiv.classList.add("cart-item");
        cartItemDiv.textContent = item.title;
        container.appendChild(cartItemDiv);
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => removeItemFromCart(index);
        cartItemDiv.appendChild(removeButton);
    });
}

function removeItemFromCart(index) {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    displayCart();
}
