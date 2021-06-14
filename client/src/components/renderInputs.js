import React from 'react'

import { TextField } from '@material-ui/core';



const renderInputs = data => {
    const { values, setFieldValue, errors, columns, props } = data;

    let inputs = [];

    for (const value in values) {
        const type = values[value]?.type ?? false;




        let handles = {
            onChange: e => {
                if (data.update && e.target.type !== 'checkbox') data.update(value, e.target.value);
                else if (data.update) data.update(value, e.target.checked);
                if (data.handleChange && e.target && e.target.type && e.target.type !== 'checkbox') data.handleChange(e);
                else if (e.target && e.target.type) setFieldValue(value, e.target.checked);
                else setFieldValue(value, e)
            }
        };

        const title = columns ? columns.map(column => (column.accessor === value ? column.Header : '')) : '',
            style = {};


        const input = (
            <div key={value} style={style}>
                {typeof values[value] === 'boolean' ? (
                    <>
                        <input type="checkbox" id={value + '_check'} name={value + '_check'} checked={values[value]} {...handles} />
                        <label htmlFor={value + '_check'}>{title}</label>
                    </>
                ) : (
                                <TextField
                                    id={value}
                                    label={title}
                                    value={values[value]}
                                    type="text"
                                    error={!!errors[value]}
                                    {...handles}
                                />
                        )}

                    {/*</>*/}

            </div>
        );

        inputs.push(input)
    }

    return inputs
};


export {
    renderInputs,
}

