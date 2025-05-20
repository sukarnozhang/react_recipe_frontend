import styles from  "../css/SearchItem.modules.css"
import { MagnifyingGlass } from "phosphor-react";

function SearchItem() {

    return (
        <div>
            <MagnifyingGlass className="responsiveIcon"/>
            <input 
                placeholder="search items ..."
                className="searchItem"
            />
        </div>
    );
}

export default SearchItem;