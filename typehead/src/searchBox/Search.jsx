import { useState } from "react";
import { FetchApi } from "../db/FetchApi";

export const Search = ({
    id,
    name,
    label,
    placeholder,
    autoComplete,
    maxItems,
    styles,
    debounceWait,
    listBox,
    noItemMessage,
    errorMessage,
    transformData,
    promise
}) => {
    const [query, setQuery] = useState("");
    const [activeIndex, setActiveIndex] = useState(null);
    const [isAutoComplete, setIsAutoComplete] = useState(autoComplete);
    const [data, setData, error] = FetchApi(
        query,
        transformData,
        promise,
        debounceWait,

        isAutoComplete
    );

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleKeyUp = (e) => {
        const keyCode = e.keyCode;
        if (keyCode === 13) {
            //user enter

            if (activeIndex === null) return;
            setQuery(data[activeIndex].name);
            setData(null);
            setActiveIndex(null);
            setIsAutoComplete(false);
            return;
        }

        setIsAutoComplete(true);
        if (!data || data.length === 0) return;

        if (keyCode === 40) {
            //move down
            if (activeIndex === null || activeIndex === data.length - 1) {
                setActiveIndex(0);
            } else {
                setActiveIndex((prevIndex) => prevIndex + 1);
            }
        } else if (keyCode === 38) {
            //moving up
            if (activeIndex === 0) setActiveIndex(data.length - 1);
            else setActiveIndex((prevIndex) => prevIndex - 1);
        }
    };

    return (
        <>
            <label className={styles.label} for={name}>
                {" "}
                {label}{" "}
            </label>
            <br />
            <input
                name={name}
                className={styles.input}
                id={id}
                placeholder={placeholder}
                value={query}
                onChange={handleChange}
                autoComplete="off"
                onKeyUp={handleKeyUp}
            />
            {data && data.length > 0 && listBox(data, activeIndex)}
            {query && data && data.length === 0 && noItemMessage()}
            {error && errorMessage()}
        </>
    );
};
