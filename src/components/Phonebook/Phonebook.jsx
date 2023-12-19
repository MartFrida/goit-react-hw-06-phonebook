import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { StyledWrapper } from './Phonebook.styled';
import { FilterUsers } from 'components/FilterUsers/FilterUsers';
import { ContactList } from 'components/ContactList/ContactList';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { useDispatch, useSelector } from 'react-redux';
import { store } from '../../redux/store';
import { addContact, filterContacts } from '../../redux/contacts/action';

export const Phonebook = () => {
  // const [contacts, setContacts] = useState([
  // ]);
  // const [filter, setFilter] = useState('');

  const contacts = useSelector(state => state.contactsData.contacts)
  const filterConts = useSelector(state => state.contactsData.filterContacts)

  const dispatch = useDispatch()

  const handleAddUser = ({ name, number }) => {
    const isExist = contacts.some((item) => item.name === name)
    if (isExist) {
      alert('ALERT')
      return
    }
    // setContacts(prevState => [...prevState, { id: nanoid(), name, number }])
    const newContact = { id: nanoid(), name, number }
    dispatch(addContact(newContact))
  }

  const handleSetFilter = (e) => {
    return e.target.value
  }

  const getFilteredContacts = () => {
    return dispatch(filterContacts(handleSetFilter))
    // return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()))
  }

  const handleDeleteUser = (id) => {
    // setContacts(prevState => prevState.filter(contact => contact.id !== id))
  }

  useEffect(() => {
    const handleContacts = JSON.parse(window.localStorage.getItem('CONTACTS_DATA'))
    if (handleContacts?.length) {
      dispatch(addContact(handleContacts))
      // setContacts(handleContacts)
    }
  }, [dispatch])

  useEffect(() => {
    window.localStorage.setItem('CONTACTS_DATA', JSON.stringify(contacts))
  }, [contacts])


  return (
    <StyledWrapper >

      <h2>Phonebook</h2>
      <ContactForm onAddContact={handleAddUser} />
      <h2>Contacts</h2>
      {/* <FilterUsers filter={filterConts} handleChangeInput={handleSetFilter} />
      <ContactList filteredContacts={getFilteredContacts()} onDeleteUser={handleDeleteUser} /> */}

    </StyledWrapper>
  )
}