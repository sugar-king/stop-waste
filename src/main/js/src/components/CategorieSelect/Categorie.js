import React from "react";
import Form from "react-validation/build/form";




function Categorie() {


    return(
     <div >
            <label><b>Kategorija</b></label>
            <select name="categories" id="categories" onChange={this.onChangeCategorie}>
                <option value="Napitci">Napitci</option>
                <option value="Mliječni proizvodi">Mliječni proizvodi</option>
                <option value="Ulje i mast">Ulje i mast</option>
                <option value="Med">Med</option>
                <option value="Meso">Meso</option>
                <option value="Voće i povrće">Voće i povrće</option>
                <option value="Zimnica">Zimnica</option>
                <option value="Orašasti plodovi">Orašasti plodovi</option>
                <option value="Začini">Začini</option>
                <option value="Brašno i kruh">Brašno i kruh</option>
                <option value="Kolači i slatkiši">Kolači i slatkiši</option>
                <option value="Ostalo">Ostalo</option>
            </select>
     </div>);
}

export default Categorie;