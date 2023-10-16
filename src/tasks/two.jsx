import { BackToHome } from "../App";
import React, { useState, useEffect } from "react";
import "./_two.scss";

const ChallengeTwo = () => {
  const [users, setUsers] = useState(new Map());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [page, setPage] = useState(1);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async (page_no) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://randomuser.me/api/?seed=dexi-interview&page=${page_no || page}`
      );
      const data = await response.json();
      setLoading(false);
      if (data.info.page !== (page_no || page)) {
        setEmpty(true);
        return;
      }
      data.results.forEach((user) => {
        setUsers((prevUsers) => new Map(prevUsers.set(user.login.uuid, user)));
      });
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  };
  useEffect(() => {
    const fetchInitialUsers = async () => {
      for (let i = 1; i < 5; i++) {
        await fetchUsers(i);
      }
      setPage(5);
    };

    fetchInitialUsers();
  }, []);

  useEffect(() => {
    if (page !== 1) fetchUsers();
  }, [page]);

  const handleEdit = (user) => {
    setEditUser(user);
  };

  const handleSave = (event) => {
    event.preventDefault();

    const editedUser = {
      ...editUser,
      name: {
        ...editUser.name,
        first: event.target.elements.firstName.value,
        last: event.target.elements.lastName.value
      },
      email: event.target.elements.email.value
    };

    const updatedUsers = new Map(users);
    updatedUsers.set(editedUser.login.uuid, editedUser);

    setUsers(updatedUsers);
    setEditUser(null);
  };

  return (
    <>
      <BackToHome />
      <h1 className="title is-1 has-text-white">Challenge 2</h1>
      <h2 className="subtitle has-text-grey-lighter">
        Fetch 5 users from the public api
        <code>https://randomuser.me/api/?seed=dexi-interview</code> and display
        them in a table.
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        <code>table-example.png</code> has been provided just for the{" "}
        <code>required</code>
        styling, feel free to choose which data to show if any of the coulmns in
        the example is missing.
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        Pay close attention to empty and loading states
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        The <code>Edit</code> button in the table should open a pop up of your
        style choice that has the fields in the table and can be edited and
        after editing and comfirming the record should change in the Table too
      </h2>
      <h2>
        <code>Note:</code>the edit will only affect your local state , that
        means we will not call an api to edit , we just want it to change on the
        client side and show the new values in the table , then on page reload
        fields will go back to the api original values)
      </h2>
      <h2 className="subtitle has-text-grey-lighter">
        The table should also have a <code>Load More</code> button that fetches
        the next page of the API and appends the results to the existing users
        whenever it's clicked.
      </h2>
      {/* Insert your table code here */}
      <div className="ch-two-container">
        {!error && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Country</th>
                <th>Gender</th>
                <th>Nationality</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {[...users].map(([key, value]) => (
                <tr key={key}>
                  <td>
                    <div className="ch-two-card-wrapper">
                      <img src={value.picture.thumbnail} alt="user-picture" />
                      <div className="ch-two-card-info">
                        <p className="ch-two-card-name">
                          {value.name.first} {value.name.last}
                        </p>
                        <p className="ch-two-card-email">{value.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="ch-two-info">{value.location.country}</p>
                    <p className="ch-two-sub-info">{value.location.state}</p>
                  </td>
                  <td>
                    <span
                      className={`ch-two-gender +
            ${
              value.gender === "male"
                ? "ch-two-gender-male"
                : "ch-two-gender-female"
            }`}
                    >
                      {value.gender}
                    </span>
                  </td>
                  <td>
                    <span className="ch-two-nationality">{value.nat}</span>
                  </td>
                  <td>
                    <button
                      className="ch-two-edit-btn"
                      onClick={() => handleEdit(value)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {loading && <div>Loading...</div>}
        {editUser && (
          <>
            <div
              className="ch-two-modal-backdrop"
              onClick={() => setEditUser(false)}
            ></div>
            <div className="ch-two-modal">
              <form className="ch-two-modal-form" onSubmit={handleSave}>
                <label>
                  First Name:
                  <input
                    type="text"
                    name="firstName"
                    defaultValue={editUser?.name?.first}
                  />
                </label>
                <label>
                  Last Name:
                  <input
                    type="text"
                    name="lastName"
                    defaultValue={editUser?.name?.last}
                  />
                </label>
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    defaultValue={editUser.email}
                  />
                </label>
                <input type="submit" value="Save" />
              </form>
            </div>
          </>
        )}
        {empty && <p>There is no more data to be loaded</p>}
        {!error && (
          <button disabled={empty} onClick={() => setPage(page + 1)}>
            Load More
          </button>
        )}
        {error && (
          <p className="warning">There was an error fetching your data</p>
        )}
      </div>
    </>
  );
};

export default ChallengeTwo;
