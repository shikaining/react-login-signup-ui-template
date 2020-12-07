import React, { useState } from 'react';
import Select from 'react-select';
import ExtendSession from './ExtendSession.component';

const fileToDataUri = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
        resolve(event.target.result)
    };
    reader.readAsDataURL(file);
})

function Register() {

    const [dataUri, setDataUri] = useState("");

    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [officer, setOfficer] = useState("");
    const [nric, setNRIC] = useState("");
    const [regTime, setRegTime] = useState(new Date().toLocaleString());
    const [branchCode, setBranchCode] = useState("");
    const [products, setProducts] = useState([]);

    const handleChange = (e) => {
        setProducts(Array.isArray(e) ? e.map(x => x.value) : []);
    }

    const verifyImage = (e) => {
        console.log(e.target.files);
        if (e.target.files[0].size <= 2097152) {
            console.log("within the limit yay");
           
            fileToDataUri(e.target.files[0])
                .then(dataUri => {
                    setDataUri(dataUri)
                })

        }
        else {
            console.log("File size limit exceeded.");
        }

    }
    const url = "http://expressbackend-env.eba-mmzyvbbv.us-east-1.elasticbeanstalk.com/validateForm"

    const options = [
        { value: '137', label: 'Investor' },
        { value: '070', label: 'Insurance' },
        { value: '291', label: 'Loans' },
        { value: '969', label: 'Savings' },
        { value: '555', label: 'Credit Cards' },
    ];

    const optionsBranch = [
        { value: '028', label: '028' },
        { value: '096', label: '096' },
        { value: '126', label: '126' },
        { value: '104', label: '104' },
        { value: '025', label: '025' },
    ];

    function submitHandler(e) {
        e.preventDefault();
        console.log("posting .. ");
        console.log({ name });
        console.log({ age });
        console.log({ officer });
        console.log({ nric });
        console.log({ regTime });
        console.log({ name });
        console.log({ branchCode });
        console.log({ dataUri });
        console.log({ products });
        console.log("AUTH-TOKEN: " + window.localStorage.getItem("Auth-Token"));
        fetch(url, {
            method: "POST",
            //mode: "cors",
            headers: {
                //"Content-Type": "application/json",
                //"Key": "",
                "Authorization": `token ${window.localStorage.getItem("Auth-Token")}`
            },
            body: JSON.stringify({
                customerName: name,
                customerAge: Number(age),
                serviceOfficerName: officer,
                NRIC: nric,
                registrationTime: regTime.slice(0, 10) + ' ' + regTime.slice(12, 20),
                branchCode: Number(branchCode),
                image: dataUri,
                productType: products
            }),
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <>
        <ExtendSession/>
        <form>
            <h3>Register New Customer</h3>
            <div className="form-group">
                <label>Customer Name</label>
                <input type="text" className="form-control" value={name} onChange={(e) => {
                    setName(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label>Customer Age</label>
                <input type="number" className="form-control" min="18" placeholder="Min. age is 18" value={age} onChange={(e) => {
                    setAge(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label>Service Officer Name</label>
                <input type="text" className="form-control" value={officer} onChange={(e) => {
                    setOfficer(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label>NRIC</label>
                <input type="text" className="form-control" value={nric} onChange={(e) => {
                    setNRIC(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label>Registration Time</label>
                <input type="text" className="form-control" value={regTime} onChange={(e) => {
                    setRegTime(e.target.value);
                }} />
            </div>
            <div className="form-group">
                <label>Branch Code</label>
                <Select options={optionsBranch}
                    className="basic-single"
                    classNamePrefix="select"
                    defaultValue={optionsBranch[0]}
                    value={optionsBranch.filter(obj => branchCode.includes(obj.value))}
                    onChange={(e) => {
                        // console.log(e.value);
                        setBranchCode(e.value);
                        // console.log({branchCode});
                    }} />
            </div>
            <div className="form-group">
                <label>Attachments</label>
                <input type="file" accept="image/png, image/jpeg" onChange={verifyImage} />
                {/* <button type = "button" className="btn btn-primary btn-block" onClick = {verifyImage}>Verify Image</button> */}
            </div>
            <div className="form-group">
                <label>Banking Products</label>
                <Select options={options} isMulti isClearable className="basic-multi-select"
                    value={options.filter(obj => products.includes(obj.value))}
                    onChange={handleChange}
                />
            </div>
            <button type="submit" onClick={submitHandler} className="btn btn-primary btn-block">Create</button>

        </form>
        </>
    )
}

export default Register;
