import { BackToHome } from "../App";

const ChallengeTwo = () => {
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
    </>
  );
};

export default ChallengeTwo;
