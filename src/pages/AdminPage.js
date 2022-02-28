import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./HomePage.css";
import { Amplify, API, Storage } from "aws-amplify";
// import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listComplaints } from "../graphql/queries";
import { deleteComplaint as deleteComplaintMutation } from "../graphql/mutations";
import config from "../aws-exports";
import "./AdminPage.css";

Amplify.configure({ ...config, Analytics: { disabled: true } });
// import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";

function AdminPage() {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    fetchComplaints();
  }, []);

  async function fetchComplaints() {
    const apiData = await API.graphql({ query: listComplaints });
    const complaintsFromAPI = apiData.data.listComplaints.items;
    await Promise.all(
      complaintsFromAPI.map(async (complaint) => {
        if (complaint.image) {
          const image = await Storage.get(complaint.image);
          complaint.image = image;
        }
        return complaint;
      })
    );
    setComplaints(apiData.data.listComplaints.items);
  }

  async function deleteComplaint({ id }) {
    const newComplaintsArray = complaints.filter(
      (complaint) => complaint.id !== id
    );
    setComplaints(newComplaintsArray);
    await API.graphql({
      query: deleteComplaintMutation,
      variables: { input: { id } },
    });
  }

  return (
    <Container>
      <Row>
        <Col>
          <div>
            <h1>Admin Page</h1>
            <p></p>
            <h4>List of Complaints</h4>
            <table style={{ marginBottom: 30, border: "1px solid" }}>
              <tr className="table-header">
                <td>Name</td>
                <td>Business Name</td>
                <td>Email</td>
                <td>Date</td>
                <td>Area</td>
                <td>Description</td>
                <td>Picture</td>
                <td>Delete?</td>
              </tr>
              {complaints.map((complaint) => (
                <tr key={complaint.id || complaint.name}>
                  <td>{complaint.name}</td>
                  <td>{complaint.business_name}</td>
                  <td>{complaint.email}</td>
                  <td>{complaint.createdAt}</td>
                  <td>{complaint.area}</td>
                  <td>{complaint.description}</td>
                  <td>
                    {" "}
                    {complaint.image && (
                      <img
                        alt="complaint"
                        src={complaint.image}
                        style={{ width: 400 }}
                      />
                    )}
                  </td>
                  <button onClick={() => deleteComplaint(complaint)}>
                    Delete note
                  </button>
                </tr>
              ))}
            </table>
            ;
            {/* <div style={{ marginBottom: 30 }}>
        {complaints.map((complaint) => (
          <div key={complaint.id || complaint.name}>
            <h2>{complaint.name}</h2>
            <p>{complaint.description}</p>
            <button onClick={() => deleteComplaint(complaint)}>
              Delete note
            </button>
            {complaint.image && (
              <img
                alt="complaint"
                src={complaint.image}
                style={{ width: 400 }}
              />
            )}
          </div>
        ))}
      </div> */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default AdminPage;
