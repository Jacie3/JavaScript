<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Demo2.aspx.cs" Inherits="Demo2" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Understanding ObservableArray of Knockout</title>
    <script src="Scripts/jquery-3.1.1.js"></script>
    <script src="jquery.tmpl.js"></script>
    <script src="Scripts/knockout-3.4.0.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        
    <div>
        <p>Product Name : <input type="text" data-bind="value: productName"/></p>
        <p>Price : 
            <input type="text" data-bind="value: price" /></p>
        <button data-bind="click: addProdcut">Add Product</button>
    </div>
    <%-- <div data-bind="template: 'productsTemplate'"></div> 

    <script type="text/html" id="productsTemplate">
        <ul>
            {{each(index,product) products}}
       <li>
           <label>Product ${product.pname} - ${product.price} added at ${new Date}</label></li>
            {{/each}}
        </ul>
    </script>--%>

        <ul data-bind="template: {name: 'productsTemplate', foreach: products}"></ul>
        <script type="text/html" id="productsTemplate">
            <li> <label>Product ${data.pname} - ${data.price} added at ${new Date}</label></li>
        </script>
    </div>
    </form>
    <script type="text/javascript">
        function Product(pname, price) {
            return {
                pname: ko.observable(pname),
                price: ko.observable(price)
            };
        }

        var vm = {
            productName: ko.observable("New Product"),
            price: ko.observable(0),
            products: ko.observableArray([new Product("Laptop", 45000), new Product("Camera", 28000)]),
            addProduct: function () {
                vm.products.push(new Product(this.productName(), this.price()));
        }
        };

        ko.applyBindings(vm);
    </script>
</body>
</html>
