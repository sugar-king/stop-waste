import React from "react";
import AuthService from '../../services/auth.service';

function Categories() {


if (AuthService.getCurrentUser() == undefined){
    return(
        <table >
            <caption><b>Kategorije</b></caption>
            <tr>
                <td><input type="checkbox" id="Napitci" name="check" value="Napitci"/>Napitci</td>
                <td><input type="checkbox" id="Mliječni proizvodi" name="check" value="Mliječni proizvodi"/>Mliječni proizvodi</td>
            </tr>

            <tr>
                <td><input type="checkbox" id="Ulje i mast" name="check" value="Ulje i mast"/>Ulje i mast</td>
                <td><input type="checkbox" id="Med"  name="check" value="Med"/>Med</td>
            </tr>

            <tr>
                <td><input type="checkbox" id="Meso"  name="check" value="Meso"/>Meso</td>
                <td><input type="checkbox" id="Voće i povrće"  name="check" value="Voće i povrće"/>Voće i povrće</td>
            </tr>

            <tr>
                <td><input type="checkbox" id="Zimnica"  name="check" value="Zimnica"/>Zimnica</td>
                <td><input type="checkbox" id="Orašasti plodovi"  name="check" value="Orašasti plodovi"/>Orašasti plodovi</td>
            </tr>

            <tr>
                <td><input type="checkbox" id="Začini" name="check" value="Začini"/>Začini</td>
                <td><input type="checkbox"  id="Brašno i kruh" name="check" value="Brašno i kruh"/>Brašno i kruh</td>
            </tr>

            <tr>
                <td><input type="checkbox"  id="Kolači i slatkiši" name="check" value="Kolači i slatkiši"/>Kolači i slatkiši</td>
                <td><input type="checkbox" id="Ostalo"  name="check" value="Ostalo"/>Ostalo</td>
            </tr>
        </table>
    );}

else{
    var categoryNames = AuthService.getCurrentUser().categories;
    console.log(categoryNames);
    var kategorije = ["Napitci","Mliječni proizvodi","Ulje i mast","Med","Meso","Voće i povrće","Zimnica","Orašasti plodovi",
        "Začini", "Brašno i kruh","Kolači i slatkiši","Ostalo"];

    var items=[];


    for(var i=0;i<=10;i+=2) {
        var redak1='';
        var redak2='';

        var imeKategorije1 = kategorije[i];
        var imeKategorije2 = kategorije[i+1];

        if(categoryNames.includes(imeKategorije1))redak1 = <td><input type="checkbox" checked  id={imeKategorije1} name="check" value={imeKategorije1}/>{imeKategorije1}</td>;
        else {
            redak1 = <td><input type="checkbox"  id={imeKategorije1} name="check" value={imeKategorije1}/>{imeKategorije1}</td>;
        }

        if(categoryNames.includes(imeKategorije2))redak2=<td><input type="checkbox" checked  id={imeKategorije2} name="check" value={imeKategorije2}/>{imeKategorije2}</td>;
        else {
            redak2 = <td><input type="checkbox"  id={imeKategorije2} name="check" value={imeKategorije2}/>{imeKategorije2}</td>;
        }

        items.push(

            <tr>
                {redak1}
                {redak2}
            </tr>
        )
    }

    return (

        <table>
            <caption><b>Kategorije</b></caption>
            {items}
        </table>

    )

}
}

export default Categories;

/*
else
{
    var categoryNames = AuthService.getCurrentUser().categories;
    console.log(categoryNames);
    var kategorije = ["Napitci","Mliječni proizvodi","Ulje i mast","Med","Meso","Voće i povrće","Zimnica","Orašasti plodovi",
        "Začini", "Brašno i kruh","Kolači i slatkiši","Ostalo"];
    var items=[];

    for(var i=0; i<=5; i+2) {

        var checked1 = '';
        var checked2 = '';
        if (categoryNames.includes(kategorije[i])) checked1 = "checked";
        if (categoryNames.includes(kategorije[i + 1])) checked2 = "checked";

        items.push(
            <tr>
                <td><input type="checkbox" checked name="check" value={kategorije[i]}/></td>
                <td><input type="checkbox" name="check" value={kategorije[i + 1]}/></td>
            </tr>
        )
    }

    return (
        <table>
            <caption><b>Kategorije</b></caption>
            {items}
        </table>
    );
}

 */