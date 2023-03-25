async function loadData() {
    try {
        var response = await fetch('../Data/reviews.json', { "Access-Control-Allow-Origin": "*" });
        var content = await response.json();
    } catch {
        console.log("Not able to read file");
    }

    return content;
}

function getRatingWidth(rating) {
    var width = 0;
    rating = rating[6]

    switch (rating) {
        case "1":
            width = "14px";
            break;
        case "2":
            width = "28px";
            break;
        case "3":
            width = "42px";
            break;
        case "4":
            width = "56px";
            break;
        case "5":
            width = "70px";
            break;
    }

    return width;
}

function createReview(userdata, parent) {
    let ratingWidth = getRatingWidth(userdata.rating)

    if (ratingWidth !== "70px") return;
    if (userdata.review === "") return;

    let review = document.createElement("div");
    review.classList.add("review");

    let img = document.createElement("img");
    img.src = userdata.profilePic;
    review.appendChild(img);

    let info = document.createElement("div");
    info.classList.add("info");

    let name = document.createElement("div");
    name.classList.add("name");
    name.innerText = userdata.username;

    let rating = document.createElement("div");
    rating.classList.add("rating");

    let empty = document.createElement("span");
    empty.classList.add("empty");
    empty.classList.add("extra");

    let star = document.createElement("span")
    star.style.width = ratingWidth;

    empty.appendChild(star);
    rating.appendChild(empty);
    info.appendChild(name);
    info.appendChild(rating);

    let content = document.createElement("div");
    content.classList.add("content");
    content.innerText = userdata.review;
    info.appendChild(content);


    review.appendChild(info);


    parent.appendChild(review);


}

const delay = ms => new Promise(res => setTimeout(res, ms));

async function pageScroll() {
    // if (document.documentElement.scrollTopMax < window.pageYOffset + 1) {
    //     return Promise.resolve();
    // }
    // window.scrollBy(0, 1);
    // scrolldelay = setTimeout(pageScroll, 10);
    const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
    console.log(window.scrollY, scrollableHeight)

    while (scrollableHeight > window.scrollY) {
        window.scrollBy(0, 1);
        console.log("here")
        await delay(100);
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function breakBlock() {
    let reviews = document.querySelectorAll(".review");
    let target = reviews[reviews.length - 1];
    target.style.animation = `450ms cubic-bezier(1, 0, 0,1) 0s 1 alternate forwards break`;
    target.style.position = "relative"
    target.style.zIndex = "5"

    let delay = 0;
    for (var i = reviews.length - 2; i >= 0; i--) {
        target = reviews[i]
        target.style.animation = `500ms cubic-bezier(.69,.25,.78,.21) ${900 + delay}ms 1 alternate forwards fall`;
        target.style.position = "relative";
        target.style.zIndex = "6";
        delay += 500;
    }

}

function initAnimation() {
    let reviews = document.querySelectorAll(".review");
    let target = reviews[reviews.length - 1];
    let rect = target.getBoundingClientRect();
    let yPos = target.offsetTop + ((rect.height - 70) / 2);
    const canvas = document.getElementById("canvas");

    canvas.style.left = "-64px";
    canvas.style.top = yPos + "px";
    // canvas.style.position = "absolute";
    canvas.width = (window.innerWidth * 15 / 100) + 128;

    const ctx = canvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;

    return ctx;
}

let posX = 0;
let count = 0;
function rightMove(ctx) {
    posX += 5;
    if (posX >= ((window.innerWidth * 15 / 100))) {
        count = 0;
        return true;
    }
    ctx.clearRect(0, 0, (window.innerWidth * 15 / 100) + 128, 64)

    const image = document.getElementById("source");
    ctx.drawImage(image, 16 + 48 * count, 304, 16, 16, posX, 0, 64, 64);


    count++;
    if (count > 7) {
        count = 0;
    }
    return false;
}

let total = 0;
function chopMove(ctx) {
    ctx.clearRect(0, 0, (window.innerWidth * 15 / 100) + 128, 70)

    const image = document.getElementById("source");
    switch (count) {
        case 0:
            ctx.drawImage(image, 16, 928, 32, 16, posX - 8, 0, 128, 64);
            break;
        case 1:
            ctx.drawImage(image, 16 + 39 * 1, 928, 32, 16, posX - 32, 0, 128, 64);
            break;
        case 2:
            ctx.drawImage(image, 16 + 86, 928, 32, 16, posX - 32, 0, 128, 64);
            break;
        case 3:
            ctx.drawImage(image, 16 + 134, 928, 32, 16, posX - 32, 0, 128, 64);
            break;
        case 4:
            ctx.drawImage(image, 16 + 184, 927, 32, 18, posX - 8, 0, 128, 67);
            break;
        case 5:
            ctx.drawImage(image, 16 + 232, 927, 32, 18, posX - 8, 0, 128, 67);
            break;
        case 6:
            ctx.drawImage(image, 16 + 280, 927, 32, 18, posX - 8, 0, 128, 67);
            break;
        case 7:
            ctx.drawImage(image, 16 + 328, 927, 32, 18, posX - 8, 0, 128, 67);
            break;
    }

    count++;
    if (count > 7) {
        count = 0;
    }

    if (total === 24) {
        total = 0;
        ctx.clearRect(0, 0, (window.innerWidth * 15 / 100) + 128, 70)
        count = 0;
        return true;
    }

    total++;
    return false;
}

function leftMove(ctx) {
    posX -= 5;
    if (posX < 0) {
        ctx.clearRect(0, 0, (window.innerWidth * 15 / 100) + 128, 64)
        return true;
    }

    ctx.clearRect(0, 0, (window.innerWidth * 15 / 100) + 128, 64)

    const image = document.getElementById("source");
    ctx.drawImage(image, 16 + 48 * count, 352, 16, 16, posX, 0, 64, 64);


    count++;
    if (count > 7) {
        count = 0;
    }
    return false;
}

function resetCanvas() {

    const canvas = document.getElementById("canvas");

    canvas.style.left = "-0px";
    canvas.style.top = "0px";
}

function deletePrev() {
    var reviews = document.querySelectorAll(".review");
    for (var i = 0; i < reviews.length; i++) {
        
        reviews[i].remove();
    }
}



async function main(index, max) {

    let data = await loadData();
    let parent = document.getElementsByClassName("container")[0];

    if(index > data.length) {
        index = 0;
    }

    for (var i = index; i <= index + max; i++) {
        createReview(data[i], parent);
    }



    let right = false;
    let left = false;
    let chop = false;

    await delay(40000);
    console.log("Starting scroll")
    await pageScroll()
    console.log("Finsish scrool")
    await delay(40000);


    console.log("start animation")

    let ctx = initAnimation();
    while (!left) {
        await delay(120)

        if (!right) {
            right = rightMove(ctx);

        }
        if (right && !chop) {
            chop = chopMove(ctx);

        }

        if (chop) {
            left = leftMove(ctx)
        }


    }
    breakBlock();
    await delay(3500);
    scrollToTop()
    await delay(1000);
    deletePrev();
    resetCanvas()


    main(index + max + 1, max);


}

main(0, 15);

