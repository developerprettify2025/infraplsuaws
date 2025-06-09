"use client"
import { useFormContext } from "react-hook-form";
import { findInputError } from "./findInputError";
import { isFormInvalid } from "./isFormInvalid";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
export const Input = ({
    name,
    label,
    type,
    id,
    placeholder,
    validation,
    textbox,
    multiline,
    dropdown,
    maxLength,
    value,
}) => {
    const {
        register,
        formState: { errors },
    } = useFormContext();

    const inputError = findInputError(errors, name);
    const isInvalid = isFormInvalid(inputError);
    function numeralsOnly(evt, type) {
        if (type === "number") {
            var input = evt.target.value;    
            if (input.length > 14) {
                //alert("Input length should not exceed 15 characters!");
                evt.preventDefault();
                return false;
            } else {
                evt = evt || window.event;
                var charCode = evt.charCode || evt.keyCode || evt.which || 0;
    
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    alert("Enter digits only in this field!");
                    evt.preventDefault();
                    return false;
                }
            }
        }
        else {
            // You might want to add additional checks or actions for other types here
            return true;
        }
    
    }

// Input Validate
const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  
  const handleInputChange = (e) => {
   
    const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    // String(errors?.name) === name ? "" : ""
  };
useEffect(()=>{
    //console.log(formData)
},[formData])

    return (
        <>
            <div className={`form-group ${formData[name] === "" ? "" : "valid"}`}>
                {textbox ? (
                    <>
                        <input
                            id={id}
                            name={name}
                            type={type}
                            className="form-control"
                            placeholder={placeholder}
                            {...register(name, validation)}
                            value={value}
                            onKeyPress={(e) => numeralsOnly(e, type)}
                            onKeyUp={handleInputChange}
                            
                        />
                        <label htmlFor={id}>{label}</label>
                    </>
                ) : null}

                {multiline ? (
                    <>
                        <textarea
                            rows="4"
                            name={name}
                            cols="10"
                            id={id}
                            type={type}
                            className="form-control"
                            placeholder={placeholder}
                            {...register(`${name}`, validation)}
                            onKeyUp={handleInputChange}
                        ></textarea>
                        <label htmlFor={id}>{label}</label>
                    </>
                ) : null}
                {dropdown ? (
                    <>
                        <select
                            id={id}
                            name={name}
                            type={type}
                            className="form-control"
                            placeholder={placeholder}
                            {...register(`${name}`, validation)}
                            onChange={handleInputChange}
                        >
                            <option value="">Select service</option>
                            {dropdown.map(({ heading }, key) => {
                                return (
                                    <option key={key} value={heading}>
                                        {heading}
                                    </option>
                                );
                            })}
                        </select>
                        <div className="icondoro"></div>
                    </>
                ) : null}
                <AnimatePresence mode="wait" initial={false}>
                    {isInvalid && (
                        <InputError message={inputError.error.message} key={inputError.error.message}/>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
const InputError = ({ message }) => {
    return (
        <motion.p
            className="error_msg"
            {...framer_error}
        >
            {/* <MdError /> */}
            {message}
        </motion.p>
    );
};

const framer_error = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.2 },
};
