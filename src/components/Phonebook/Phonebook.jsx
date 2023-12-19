import React from 'react';
import { StyledWrapper } from './Phonebook.styled';
import { FilterUsers } from 'components/FilterUsers/FilterUsers';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { addContact, deleteContact, setFilter } from '../../redux/contacts/contactsSlice';
import { nanoid } from '@reduxjs/toolkit';

export const Phonebook = () => {

  const filter = useSelector(state => state.contactsData.filter)
  const contacts = useSelector(state => state.contactsData.contacts)
  const dispatch = useDispatch()
  // console.log(contacts)

  const handleAddUser = ({ name, number }) => {
    const isExist = contacts.some((item) => item.name === name)
    if (isExist) {
      alert('ALERT')
      return
    }
    const newContact = { id: nanoid(), name, number }
    dispatch(addContact(newContact))
  }

  const handleSetFilter = (e) => {
    dispatch(setFilter(e.target.value))
  }

  const getFilteredContacts = () => {
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const handleDeleteUser = (id) => {
    dispatch(deleteContact(id))
  }

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