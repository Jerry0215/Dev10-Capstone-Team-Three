package capstone_project.models;



//import org.springframework.security.core.userdetails.User;



import com.fasterxml.jackson.annotation.JsonProperty;
import com.mysql.cj.jdbc.BlobFromLocator;


import java.sql.Blob;
import java.util.ArrayList;
import java.util.List;

public class Person {

    private int personId;
    private String firstName;
    private String middleName;
    private String lastName;

    private String suffix;

    private String photo;

    public String getPhoto() {

        return photo;
    }

    public void setPhoto(String photo) {

        this.photo = photo;
    }

    private String photoDir;


    private String photoName;
    private String phone;

    public String getPhotoName() {
        return photoName;
    }



    public void setPhotoName(String photoName) {
        this.photoName = photoName;
    }

    public String getPhotoDir() {
        return photoDir;
    }

    public void setPhotoDir(String photoDir) {
        this.photoDir = photoDir;
    }

    private List<Location> locations = new ArrayList<>();


//    private AppUser user;


    private int locationId;
    private int userId;


    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }


    public String getMiddleName() {
        return middleName;
    }

    public void setMiddleName(String middleName) {
        this.middleName = middleName;
    }

    public String getSuffix() {
        return suffix;
    }

    public void setSuffix(String suffix) {
        this.suffix = suffix;
    }


    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }


    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<Location> getLocations() {
        return locations;
    }

    public void setLocations(List<Location> locations) {
        this.locations = locations;
    }


//    public AppUser getUser() {
//        return user;
//    }
//
//    public void setUser(AppUser user) {
//        this.user = user;
//    }


}