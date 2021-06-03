import React, { useEffect, useState } from "react";
import "./AdminPage.css";
import axios from "axios";
import { DeleteForever } from "@material-ui/icons";
const AdminPage = () => {
  const [reportData, setReportData] = useState([]);
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reports", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => setReportData(response.data))
      .catch((error) => console.log(error));

    axios
      .get("http://localhost:5000/api/reports/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => setProfileData(response.data))
      .catch((error) => console.log(error));
  }, []);

  const removeReportHandler = (reportId) => {
    axios
      .delete(`http://localhost:5000/api/reports/${reportId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() =>
        setReportData(
          reportData.filter((report) => {
            return report.id != reportId;
          })
        )
      )
      .catch((error) => console.log(error));
  };

  const removeProfileHandler = (profileId) => {
    axios
      .delete(`http://localhost:5000/api/reports/users/${profileId}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(() =>
        setProfileData(
          profileData.filter((profile) => {
            return profile.id != profileId;
          })
        )
      )
      .catch((error) => console.log(error));
  };

  return (
    <div className="admin">
      <table className="admin__reports">
        <tr>
          <th>Titre du Post</th>
          <th>Date création du post</th>
          <th>Prénom auteur du signalement</th>
          <th>Nom auteur du signalement</th>
          <th>Date création du signalement</th>
          <th>Suppression du signalement</th>
        </tr>
        {reportData.map((report) => (
          <tr key={report.id}>
            <td>{report.Post.title}</td>
            <td>
              {new Date(report.Post.createdAt).toLocaleDateString("fr-FR")}
            </td>
            <td>{report.User.firstname}</td>
            <td>{report.User.lastname}</td>
            <td>{new Date(report.createdAt).toLocaleDateString("fr-FR")}</td>
            <td>
              <DeleteForever
                className="admin__table__remove"
                onClick={() => removeReportHandler(report.id)}
              />
            </td>
          </tr>
        ))}
      </table>
      <table className="admin__users">
        <tr>
          <th>Profil</th>
          <th>Suppression du Profil</th>
        </tr>
        {profileData.map((profile) => (
          <tr key={profile.id}>
            <td>
              {profile.firstname} {profile.lastname}
            </td>
            <td>
              <DeleteForever
                className="admin__table__remove"
                onClick={() => removeProfileHandler(profile.id)}
              />
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default AdminPage;
