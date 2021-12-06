
import { useState } from 'react'

export default function Uploadhinh() {

    const [file, setFile] = useState(null);

    const onInputChange = (e) => {
        console.log(e.target.files);
        setFile(e.target.files[0]);
    }

    const onSubmit = () => {
        const formData = new FormData();
        formData.append('file', file);
        fetch('http://localhost:3008/upload', {
            method: 'POST',
            body: formData
        })
            .then((response) => response)
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
    const src = 'http://localhost:3008/upload/' + file
    return (
        <div>
            <div>
                <input type="file" onChange={onInputChange}></input>
            </div>
            <button onClick={onSubmit}>Submit</button>

            <img src={src} alt="hinh" ></img>
        </div>
    )
}
