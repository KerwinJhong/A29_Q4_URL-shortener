// ===========  show/hind nav bar ===========
var prevScrollpos = window.pageYOffset
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.top = "0"
    } else {
        document.getElementById("navbar").style.top = "-65px"
    }
    prevScrollpos = currentScrollPos
}

// ===========  show/hind search bar ===========
function showSelect() {
    var x = document.getElementById("selecterGroup")
    if (x.style.display === "none") {
        x.style.display = "block"
    } else {
        x.style.display = "none"
    }
}
// ===========  search item show in search bar ===========
function selecter(dd) {
    let vv = '.' + dd + 'Srt'
    let otBox
    if (dd === 'year') { otBox = "inVaYear" }
    if (dd === 'month') { otBox = "inVaMonth" }
    if (dd === 'day') { otBox = "inVaDay" }
    if (dd === 'category') { otBox = "inVaCategory" }

    var ww = document.querySelectorAll(vv)
    var oo = document.getElementById(otBox)
    for (let i = 0; i < ww.length; i++) {
        if (ww[i].checked) {
            oo.value = ww[i].value
        }
    }
    searchDis()
}
// ===========  search item disabled  ===========
function searchDis() {
    let yearDis = document.getElementById("inVaYear")
    let monthDis = document.getElementById("inVaMonth")
    let dayDis = document.getElementById("inVaDay")
    monthDis.disabled = false
    dayDis.disabled = false
    if (yearDis.value === "全部") {
        monthDis.disabled = true
        monthDis.value = ""
        dayDis.value = ""
    }
    if (yearDis.value.trim() === "") monthDis.disabled = true
    if (monthDis.value === "全部") {
        dayDis.disabled = true
        dayDis.value = ""
    }
    if (monthDis.value.trim() === "") dayDis.disabled = true
}
// ===========  add search item  ===========
function yearItem() {
    var pp = document.getElementById("yearList")
    if (pp.innerHTML.trim() === "") {
        let htmlContent = ``
        let nowYear = new Date().getFullYear()
        htmlContent = `
      <label class="custom-control custom-radio" style="padding: 5vh 190px;text-align: center;border: 1px solid #808080;margin: 0;" for="year1">
      <input type="radio" id="year1" name="year" value="全部" class="custom-control-input yearSrt">
      <label class="custom-control-label" for="year1">全部</label>
      </label>`
        for (let i = 0; i < 5; i++) {
            cunt = nowYear - i
            htmlContent += `
      <label class="custom-control custom-radio" style="padding: 5vh 190px;text-align: center;border: 1px solid #808080;margin: 0;" for="year${cunt}">
      <input type="radio" id="year${cunt}" name="year" value="${[cunt]}" class="custom-control-input yearSrt">
      <label class="custom-control-label" for="year${cunt}">${[cunt]}年</label>
      </label>
      `
        }
        pp.innerHTML = htmlContent
    }
}

function monthItem() {
    var pp = document.getElementById("monthList")
    if (pp.innerHTML.trim() === "") {
        let htmlContent = ``
        htmlContent = `
      <label class="custom-control custom-radio" style="padding: 5vh 190px;text-align: center;border: 1px solid #808080;margin: 0;" for="month15">
      <input type="radio" id="month15" name="month" value="全部" class="custom-control-input monthSrt">
      <label class="custom-control-label" for="month15">全部</label>
      </label>`
        for (let i = 0; i < 12; i++) {
            htmlContent += `
      <label class="custom-control custom-radio" style="padding: 5vh 190px;text-align: center;border: 1px solid #808080;margin: 0;" for="month${i + 1}">
      <input type="radio" id="month${i + 1}" name="month" value="${[i + 1]}" class="custom-control-input monthSrt">
      <label class="custom-control-label" for="month${i + 1}">${[i + 1]}月</label>
      </label>
      `
        }
        pp.innerHTML = htmlContent
    }
}

function dayItem() {
    var pp = document.getElementById("dayList")
    if (pp.innerHTML.trim() === "") {
        let htmlContent = ``
        htmlContent = `
      <label class="custom-control custom-radio" style="padding: 5vh 190px;text-align: center;border: 1px solid #808080;margin: 0;" for="day40">
      <input type="radio" id="day40" name="day" value="全部" class="custom-control-input daySrt">
      <label class="custom-control-label" for="day40">全部</label>
      </label>`
        for (let i = 0; i < 31; i++) {
            htmlContent += `
      <label class="custom-control custom-radio" style="padding: 5vh 190px;text-align: center;border: 1px solid #808080;margin: 0;" for="day${i + 1}">
      <input type="radio" id="day${i + 1}" name="day" value="${[i + 1]}" class="custom-control-input daySrt">
      <label class="custom-control-label" for="day${i + 1}">${[i + 1]}日</label>
      </label>
      `
        }
        pp.innerHTML = htmlContent
    }
}

// ===========  simplify money value ===========
function changeNum(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (Number(arr[i].innerText) > 10000000) {
            let tenMillion = Math.floor((arr[i].innerText) / 10000000)
            arr[i].innerText = `$${tenMillion}千萬`
        } else if (Number(arr[i].innerText) > 100000) {
            let tenThousand = Math.floor((arr[i].innerText) / 10000)
            arr[i].innerText = `$${tenThousand}萬`
        } else {
            let e = `$${arr[i].innerText}`
            arr[i].innerText = e
        }
    }
}

// ===========  simplify money value ===========
changeNum(document.querySelectorAll("#amount"))
changeNum(document.querySelectorAll("#total"))

// ===========  search item disabled ===========
searchDis()