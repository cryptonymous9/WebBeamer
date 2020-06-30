// Creating and Adding Dynamic Form Elements.
var i = 1; // Global Variable for Name
console.log("script running")

/*
=================
Creating required fields for the Form.
=================
*/

function addFields() {

    // row
    var div1 = document.createElement("div");
    div1.className = "row"
    div1.id = "row_" + i

    //col-md-2
    var div2 = document.createElement("div");
    div2.className = "col-md-2"

    // select
    var select_el = document.createElement("select")
    select_el.id = "myselect" + [i]
    select_el.name = "Select" + [i]
    select_el.className = "form-control"
    div2.appendChild(select_el)
    var array = ["Heading", "Subheading", "Normal Text", "Figure", "Maths"]
    for (var j = 0; j < array.length; j++) {
        var option = document.createElement("option");
        option.value = j;
        option.text = array[j];
        select_el.appendChild(option);
    }



    //textfield-div
    var text_field = document.createElement("div");
    text_field.className = "textfield";

    //textarea
    var text_area = document.createElement("textarea");
    text_area.className = "form-control";
    text_area.id = "inputContent" + [i];
    text_area.name = "Text_" + [i];
    text_field.appendChild(text_area);


    //delete-btn div
    var div3 = document.createElement("div");
    div3.className = "col-md-1";

    //btn-danger

    var del = document.createElement("button");
    // del.name =  i;
    del.textContent = "X";
    // del.className = "delete btn btn-danger";
    // del.onclick = "deleteField(this)";

    del.setAttribute("class", "delete btn btn-danger")
    del.setAttribute("name",i)
    // del.setAttribute("textContent", "X")
    del.setAttribute("onclick","deleteField(this)")

    div3.appendChild(del)

    div1.appendChild(div2)
    div1.appendChild(text_field)
    div1.appendChild(div3)

    document.getElementById("dynamic-stuff").appendChild(div1);
    i++;
    
    var count = document.getElementById("counter")
    count.value=i;
}

function deleteField(element){
    var element = document.getElementById("row_" + element.name);
    element.parentNode.removeChild(element);

}