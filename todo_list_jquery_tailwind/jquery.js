$(document).ready(function () {
    var list = JSON.parse(localStorage.getItem("task"));
    filters = document.querySelectorAll(".filter-blk span");
    // add list
    $("#todo-form").on("submit", function (e) {
        e.preventDefault();
        var input = $("#input").val().trim();
        if (!list) {
            list = [];
        }
        var task = { task: input, status: "active" };
        if (!input.length < 1) {
            list.push(task);
            localStorage.setItem("task", JSON.stringify(list));
        }
        $("#input").val("");
        total();
        showData("all");
    });
    // to filt status 
    $.each(filters, function (id, btn) {
        btn.addEventListener("click", () => {
            document.querySelector("span.active").classList.remove("active");
            btn.classList.add("active");
            showData(btn.id);
        });
    });
    // show data function 
    function showData(filter) {
        var li = "";
        var list = JSON.parse(localStorage.getItem("task"));
        if (list) {
            $.each(list, function (id, todo) {
                var isCompleted = todo.status == "completed" ? "checked" : "";
                if (filter == todo.status || filter == "all") {
                    li += `<li class="list flex my-3">
                                    <p class="list-blk"></p>
                                    <input type="checkbox" class="mr-2 my-auto checkbox" value="${todo.task}" id="${id}" ${isCompleted}>
                                    <label class="${isCompleted} task_name">${todo.task}</label>
                                    <button class="delete ml-auto text-red-500" value="${id}">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    </button>
                                    </p>
                                </li>`;
                }
            });
        }
        $('.resultList').empty().append(li);
    }
    // make complete
    $("ul").on("click", ".checkbox", function () {
        $(this).closest("li").find(".task_name").toggleClass("checked");
        $(this).closest("label").toggleClass("checked");
        var id = $(this).attr('id');
        if ($(this).closest("li").find("label").hasClass('checked')) {
            list[id].status = "completed";
        }
        else {
            list[id].status = "active";
        }
        localStorage.setItem("task", JSON.stringify(list));
        total();
        showData("all");
    });
    // delete task list
    $("ul").on("click", ".delete", function () {
        $(this).closest("li").fadeOut(200);
        var taskId = $(this).val();
        list.splice(taskId, 1);
        localStorage.setItem("task", JSON.stringify(list));
        total();
        showData("all");
    });
    // edit task list name
    $("ul").on("dblclick", ".task_name", function () {
        $(this).closest("li").find("input").attr("type", "text");
        $(this).closest("li").find("input").removeClass("checkbox");
        $(this).closest("li").find("input").addClass("edit_checkbox");
        $(this).hide();
        $(this).closest("li").find("button").hide();
        total();
    });
    // update task list name
    $("ul").on("blur", ".edit_checkbox", function () {
        $(this).closest("li").find("input").attr("type", "checkbox");
        $(this).closest("li").find("input").removeClass("edit_checkbox");
        $(this).closest("li").find("input").addClass("checkbox");
        $(this).closest("li").find("label").show();
        $(this).closest("li").find("button").show();
        var id = $(this).attr('id');
        if (!$(this).val().trim() < 1) {
            list[id].task = $(this).val().trim();
            localStorage.setItem("task", JSON.stringify(list));
        }
        total();
        showData("all");
    });
    // check all task list
    $("#btn-checkall").click(function () {
        $(".task_name").toggleClass("checked");
        var len = $('.task_name').length;
        if ($(this).text() == "Check All") {
            if (len != 0) {
                $(this).text("Uncheck All");
            }
            for ($i = 0; $i < len; $i++) {
                $(".checkbox").attr("checked", true);
                list[$i].status = "completed";
            }
        }
        else {
            for ($i = 0; $i < len; $i++) {
                $(this).text("Check All");
                $(".checkbox").attr("checked", false);
                list[$i].status = "active";
            }
        }
        localStorage.setItem("task", JSON.stringify(list));
        total();
        showData("all");
    });
    //delete all
    $("#btn-deleteall").click(function () {
        list = list.filter(todo => todo.status != "completed");
        localStorage.setItem("task", JSON.stringify(list));
        $('#btn-checkall').text("Check All");
        total();
        showData("all");
    });
    // to show complete total task list
    function total() {
        if (list) {
            var todelete = list.filter(todo => todo.status == "active");
            var total = todelete.length;
            $('#total').text(total);
        }
    }
    showData("all");
    total();
});
