import React, { useState } from 'react';
import { StyledWrapper } from './Phonebook.styled';
import { FilterUsers } from 'components/FilterUsers/FilterUsers';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact } from '../../redux/contacts/contactsSlice';
import { nanoid } from '@reduxjs/toolkit';

export const Phonebook = () => {

  const [filter, setFilter] = useState('');

  const contacts = useSelector(state => state.contactsData.contacts)
  const dispatch = useDispatch()
  console.log(contacts)
  const handleAddUser = ({ name, number }) => {
    const isExist = contacts.some((item) => item.name === name)
    if (isExist) {
      alert('ALERT')
      return
    }
    const newContact = { id: nanoid(), name, number }

    dispatch(addContact(newContact))
    // setContacts(prevState => [...prevState, { id: nanoid(), name, number }])
  }

  const handleSetFilter = (e) => {
    setFilter(e.target.value)
  }

  const getFilteredContacts = () => {
    return contacts
    // return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const handleDeleteUser = (id) => {
    // setContacts(prevState => prevState.filter(contact => contact.id !== id))
    dispatch(deleteContact(id))
  }

  // useEffect(() => {
  //   const handleContacts = JSON.parse(window.localStorage.getItem('CONTACTS_DATA'))
  //   if (handleContacts?.length) {
  //     setContacts(handleContacts)
  //   }
  // }, [])

  // useEffect(() => {
  //   window.localStorage.setItem('CONTACTS_DATA', JSON.stringify(contacts))
  // }, [contacts])


  return (
    <StyledWrapper >

      <h2>Phonebook</h2>
      <ContactForm onAddContact={handleAddUser} />
      <h2>Contacts</h2>
      <FilterUsers filter={filter} handleChangeInput={handleSetFilter} />
      <ContactList filteredContacts={getFilteredContacts()} onDeleteUser={handleDeleteUser} />

    </StyledWrapper>
  )
}