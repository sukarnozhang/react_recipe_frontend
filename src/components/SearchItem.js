import "../css/SearchItem.modules.css"
import { MagnifyingGlass } from "phosphor-react";

function SearchItem({value, onChange}) {

    return (
        <div>
            <MagnifyingGlass className="responsiveIcon" />
            <input
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="search items ..."
                className="searchItem"
            />
        </div>
    );
}

export default SearchItem;