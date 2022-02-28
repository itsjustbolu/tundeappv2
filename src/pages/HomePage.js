import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./HomePage.css";
import Form from "react-bootstrap/Form";
import { Amplify, API, Storage } from "aws-amplify";
// import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import { listComplaints } from "../graphql/queries";
import {
  createComplaint as createComplaintMutation,
  deleteComplaint as deleteComplaintMutation,
} from "../graphql/mutations";
import config from "../aws-exports";

Amplify.configure({ ...config, Analytics: { disabled: true } });

const initialFormState = {
  name: "",
  business_name: "",
  email: "",
  date: "",
  area: "",
  description: "",
  image: "",
};

function HomePage() {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

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

  async function onChange(e) {
    if (!e.target.files[0]) return;
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchComplaints();
  }

  async function createComplaint() {
    if (!formData.name || !formData.description) return;
    await API.graphql({
      query: createComplaintMutation,
      variables: { input: formData },
    });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setComplaints([...complaints, formData]);
    setFormData(initialFormState);
    console.log(formData);
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
          <h1>Submit A Complaint</h1>
          <br />

          <form>
            <label htmlFor="name">
              Name:
              <input
                type="text"
                id="name"
                name="name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                value={formData.name}
              />
            </label>

            <label>
              Business Name:
              <input
                type="text"
                name="business_name"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    business_name: e.target.value,
                  })
                }
                value={formData.business_name}
              />
            </label>

            <label>
              Email:
              <input
                type="email"
                name="email"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                value={formData.email}
              />
            </label>

            <label>
              Date:
              <input
                type="text"
                name="date"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    date: e.target.value,
                  })
                }
                value={formData.date}
              />
            </label>
            <br />
            <label>
              Area:
              <input
                type="text"
                name="area"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    area: e.target.value,
                  })
                }
                value={formData.area}
              />
            </label>

            <label>
              Description:
              <textarea
                type="textarea"
                name="description"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                value={formData.description}
              />
            </label>

            <label>
              Upload Picture:
              <input type="file" onChange={onChange} />
            </label>

            <button type="submit" value="Submit" onClick={createComplaint}>
              SUBMIT COMPLAINT
            </button>
          </form>
          <div>
            List of Complaints
            <div style={{ marginBottom: 30 }}>
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
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
