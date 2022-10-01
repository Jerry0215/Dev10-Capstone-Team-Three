package capstone_project.models;


import com.mysql.cj.jdbc.Blob;

public class Business {
    private int businessId;
    private String name;
    private String description;

    private String photoDir;

    private Blob photo;
    private Double rating;

    private String photoName;

    public Blob getPhoto() {
        return photo;
    }

    public void setPhoto(Blob photo) {
        this.photo = photo;
    }

    private int locationId;

    public String getPhotoName() {
        return photoName;
    }

    public void setPhotoName(String photoName) {
        this.photoName = photoName;
    }

    private int personId;
    public String getPhotoDir() {
        return photoDir;
    }

    public void setPhotoDir(String photoDir) {
        this.photoDir = photoDir;
    }

    public Business(int businessId, String name, String description, Double rating, int locationId, int personId) {
        this.businessId = businessId;
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.locationId = locationId;
        this.personId = personId;
    }
    public Business(){

    }

    public int getBusinessId() {
        return businessId;
    }

    public void setBusinessId(int businessId) {
        this.businessId = businessId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getRating() {
        return rating;
    }

    public void setRating(Double rating) {
        this.rating = rating;
    }

    public int getLocationId() {
        return locationId;
    }

    public void setLocationId(int locationId) {
        this.locationId = locationId;
    }

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }
}
