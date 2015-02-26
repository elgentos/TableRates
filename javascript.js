function checkEU() {
    if(document.location.href.indexOf("twoLetterCodes")>0) {
        var EU = new Array("BE","BG","CY","DK","DE","EE","FI","FR","GR","HU","HR","IE","IT","LV","LT","LU","MT","NL","AT","PL","PT","RO","SK","SI","ES","CZ","GB","SE");
    } else {
        var EU = new Array("BEL","BGR","CYP","DNK","DEU","EST","FIN","FRA","GRC","HUN","HRV","IRL","ITA","LVA","LTU","LUX","MLT","NLD","AUT","POL","PRT","ROU","SVK","SVN","ESP","CZE","GBR","SWE");
    }
    for(i=0;i<EU.length;i++) {
        $("input[value='"+EU[i]+"']").attr('checked','checked');
    }
}

function clearValues() {
    $("input:checked").each(function (index,element) {
        e = $(element).val();
        $("input[name^='price_" + e + "']").val('');
        $("input[name^='from_" + e + "']").val('');
    });
}

function checkOutsideEU() {
    if(document.location.href.indexOf("twoLetterCodes")>0) {
        var EU = new Array("BE","BG","CY","DK","DE","EE","FI","FR","GR","HU","HR","IR","IT","LV","LT","LU","MT","NL","AT","PL","PT","RO","SK","SI","ES","CZ","GB","SE");
    } else {
        var EU = new Array("BEL","BGR","CYP","DNK","DEU","EST","FIN","FRA","GRC","HUN","HRV","IRN","ITA","LVA","LTU","LUX","MLT","NLD","AUT","POL","PRT","ROU","SVK","SVN","ESP","CZE","GBR","SWE");
    }
    /*for(i=0;i<EU.length;i++) {
        $("input[value='"+EU[i]+"']").attr('checked','checked');
    }*/
    $("input[name^='country_']").each(function (index,element) {
        if(EU.indexOf($(element).val()) === -1) {
            $(element).attr('checked','checked');
        }
    });
}

function checkOutsideEuro() {
    if(document.location.href.indexOf("twoLetterCodes")>0) {
        var EU = new Array("AL","AD","AM","AT","AZ","BY","BE","BA","BG","HR","CY","CZ","DK","EE","FI","FR","GE","DE","GR","HU","IS","IE","IT","KZ","LV","LI","LT","LU","MK","MT","MD","MC","ME","NL","NO","PL","PT","RO","RU","SM","RS","SK","SI","ES","SE","CH","TR","UA","GB","VA");
    } else {
        var EU = new Array("ALB","AND","ARM","AUT","AZE","BLR","BEL","BIH","BGR","HRV","CYP","CZE","DNK","EST","FIN","FRA","GEO","DEU","GRC","HUN","ISL","IRL","ITA","KAZ","LVA","LIE","LTU","LUX","MKD","MLT","MDA","MCO","MNE","NLD","NOR","POL","PRT","ROU","RUS","SMR","SRB","SVK","SVN","ESP","SWE","CHE","TUR","UKR","GBR","VAT");
    }
    /*for(i=0;i<EU.length;i++) {
        $("input[value='"+EU[i]+"']").attr('checked','checked');
    }*/
    $("input[name^='country_']").each(function (index,element) {
        if(EU.indexOf($(element).val()) === -1) {
            $(element).attr('checked','checked');
        }
    });
}

function reset() {
    $("input[name^='country_']").each(function (index,element) {
        $(element).removeAttr('checked');
    });
}

function checkEuro() {
    if(document.location.href.indexOf("twoLetterCodes")>0) {
        var EU = new Array("AL","AD","AM","AT","AZ","BY","BE","BA","BG","HR","CY","CZ","DK","EE","FI","FR","GE","DE","GR","HU","IS","IE","IT","KZ","LV","LI","LT","LU","MK","MT","MD","MC","ME","NL","NO","PL","PT","RO","RU","SM","RS","SK","SI","ES","SE","CH","TR","UA","GB","VA");
    } else {
        var EU = new Array("ALB","AND","ARM","AUT","AZE","BLR","BEL","BIH","BGR","HRV","CYP","CZE","DNK","EST","FIN","FRA","GEO","DEU","GRC","HUN","ISL","IRL","ITA","KAZ","LVA","LIE","LTU","LUX","MKD","MLT","MDA","MCO","MNE","NLD","NOR","POL","PRT","ROU","RUS","SMR","SRB","SVK","SVN","ESP","SWE","CHE","TUR","UKR","GBR","VAT");
    }
    for(i=0;i<EU.length;i++) {
        $("input[value='"+EU[i]+"']").attr('checked','checked');
    }
}

function setDefPrice() {
    $("input:checked").each(function (index,elmnt) {
        $(elmnt).parent().parent().find("input[name*=price]").val($("#defPrice").val());
    });
}

function setdefSubtotal() {
    $("input:checked").each(function (index,elmnt) {
        $(elmnt).parent().parent().find("input[name*=from]").val($("#defSubtotal").val());
    });
}

$(window).ready(function () {
    $("a.addRow").live('click',function () {
        row = $(this).parent().parent().parent().parent().parent().html();
        row = row.replace("<a href=\"javascript:void()\" class=\"addRow\">+ Add row</a>","");
        $(this).parent().parent().parent().parent().parent().after(row);
    });
    $("label").live('click',function(){
        checked = $(this).parent().find('input').attr('checked');
        if(checked=='checked') {
            $(this).parent().find('input').removeAttr('checked');
        } else {
            $(this).parent().find('input').attr('checked','checked');
        }
    });
});

function addRowSelectedCountries() {
    $("input:checked").each(function (index,element) {
        li = $(element).closest('li');
        li.find('a.addRow').click();
    });
}

function changeLabel() {
    var condition = $("#carriers_tablerate_condition_name").val();
    if(condition=="weight") {
        var label = "From weight";
        $(".euroCondition").hide();
    } else if(condition=="price") {
        var label = "From subtotal";
        $(".euroCondition").show();
    } else if(condition=="qty") {
        var label = "From quantity";
        $(".euroCondition").hide();
    }
    $("#conditionLabel").html(label);
}
