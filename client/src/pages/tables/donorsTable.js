import React, { useState,useEffect } from 'react'
import { connect } from 'react-redux'
import Table from '../../components/TableReact'
import SVG from 'react-inlinesvg'
import styles from './assets/tables.module.scss'
import editIcon from '../../images/edit.svg'
import deleteIcon from '../../images/bin.svg'
import {getDonors, deleteDonor} from '../../actions/donorsActions'
import addIcon from '../../images/add.svg'
import {addNewDonor} from '../../actions/donorsActions'
import AddNewD from './AddNewD'
import AddEditDonorsTable from './AddEditDonorsTable';
import jsPDF from 'jspdf'
import { PDFDownloadLink, Document, Page } from '@react-pdf/renderer'

const DonorsTable = props => {
    const {donors, onDeleteDonor}=props;
    const [editDonor, setEditDonor] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [data ,setData] = useState(donors);
   

    useEffect(()=>{

        setData(donors);

    },[donors]);


    const setEdit = (edit) =>{
        setEditDonor(edit);
        setOpenModal(true);
    };

    const setAdd = () =>{
        setEditDonor(false);
        setOpenModal(true);
    };
   
      
const columns = React.useMemo(
    () => [
        {
            Header: 'Id',
            accessor: 'dnr_id'
        },

        {
            Header: 'Name',
            accessor: 'dnr_name'
        },
        {
            Header: 'Last Name',
            accessor: 'dnr_last_name'
        },
        {
            Header: 'Blood Type',
            accessor: 'dnr_blood_type',
            //Cell: cell => statuses.find(status => status.value === cell?.cell?.value)?.label || ''
        },
        {
            Header: 'Email',
            accessor: 'dnr_email',
        },
        {
            Header: 'Phone Number',
            accessor: 'dnr_phone_num',
        },
        {
            Header: 'Address',
            accessor: 'dnr_address',
        },
        {
            Header: 'Country',
            accessor: 'dnr_country',
        },
        {
            Header: 'Donation Date',
            accessor: 'dnr_donation_date',
            //Cell: cell => (cell?.cell?.value ? moment(cell.cell.value, 'YYYY-MM-DD HH:mm:ss').format('llll') : '')
        },
        {
            Header: 'Expiration Date',
            accessor: 'dnr_expiration_date',
        },
        {
            Header: '',
            accessor: 'icons',
            collapse: true,
            Cell: cell => ( props.auth.user.role==="admin" ||  props.auth.user.role==="secretary" ?
                <div className={styles['table_controls']}>
                    <SVG src={editIcon} onClick={() => setEdit(cell.cell.row.original)}/>
                </div> :
                 <></>
            )
        },
        {
            Header: '',
            accessor: 'icons2',
            collapse: true,
            Cell: cell => ( props.auth.user.role==="admin" ?
                <div className={styles['table_controls']}>
                    <SVG src={deleteIcon} onClick={() => onDeleteDonor(cell.cell.row.original._id)} />
                </div>
                    :
                    <></>
            )
        }
    ],[]);

    return (
        <div >

            <div>
            </div>
            <div >
                
            </div>
            <div className={styles.container} >
                <button className={styles.addIcon} 
                onClick={()=>setAdd()}
                >
                    <SVG src={addIcon}/>
                </button>
                <AddEditDonorsTable
                    open={openModal}
                    donorEdit={editDonor}
                    handleClose={() => setOpenModal(false)}
                    columns={columns}
                    />
                {/*<AddNewD*/}
                {/*    open={editDonor}*/}
                {/*    handleClose={() => setEditDonor(false)}*/}
                {/*/>*/}
                <Table   columns={columns} data={data} {...props} />
                
            </div>
            <div>
             
         </div>
        </div>
    )
};





export default connect(
    state => ({
        donors: state.donors,
        auth: state.auth,
    }),
    dispatch => ({
        onGetDonors: () => {
            dispatch(getDonors())
        },
        onDeleteDonor: (id) => {
            dispatch(deleteDonor(id))
        },
    }),

)(DonorsTable)