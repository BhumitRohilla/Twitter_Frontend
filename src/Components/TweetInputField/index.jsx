import Styles from './index.module.css'
export default function TweetInputField({
    handleInput,
    text,
    imgFile,
    placeholder,
    removeImage,
    inputClass,
    imgClass,
    individualImg,
}) {
    return (
        <>
            <div className={`${Styles.tweetInputHolder} ${inputClass}`}>
                <textarea
                    maxLength={300}
                    className={Styles.tweetInput}
                    onChange={handleInput}
                    value={text}
                    type="text"
                    placeholder={placeholder}
                />
                {/* <span className={Styles.tweetInput} onInput={handleInput} contentEditable={true}></span> */}
            </div>
            <div className={`${Styles.imageHolder} ${imgClass}`}>
                {imgFile.map((element, index) => {
                    let url = URL.createObjectURL(element);
                    return (
                        <div>
                            <img className={`${Styles.tweetImage} ${individualImg}`} src={url} />
                            <button
                                onClick={() => {
                                    removeImage(index);
                                }}
                            >
                                X
                            </button>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
