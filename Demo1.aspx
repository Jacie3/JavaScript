<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Demo1.aspx.cs" Inherits="Demo1" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>My First Knockout Page!</title>
</head>
<body>
    <form id="form1" runat="server">
    <div>
        <p>First Name: <span data-bind="text: firstName" /></p>
        <p>Last Name: <span data-bind="text: lastName" /></p>
    </div>
    <hr />
    <div>
        <p>First Name : <asp:TextBox ID="txtUser" runat="server" data-bind="value: firstName, valueUpdate: 'keup' " /></p>
        <p>Last Name : <asp:TextBox ID="txtPassword" runat="server" data-bind="value: lastName"/></p>
    </div>
    <hr />
    <p>Full Name : <span data-bind="text: fullName" /></p>
    </form>
    <script src="Scripts/knockout-3.4.0.js"></script>
    <script type="text/javascript">
        var vm = {
            //firstName: "Jacie",
            //lastName: "Jermier"
            firstName: ko.observable("Jacie"),
            lastName: ko.observable("Jermier")
        };

        vm.fullName = ko.dependentObservable(function () {
            return vm.firstName() + " " + vm.lastName()
        });

        vm.firstName.subscribe(function (val)
        {
            console.log("First Name Updated as " + val);
        });
        ko.applyBindings(vm);
    </script>
</body>
</html>
