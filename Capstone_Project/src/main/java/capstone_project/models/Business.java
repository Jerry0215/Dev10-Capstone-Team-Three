package capstone_project.models;

public class Business {
    private int businessId;
    private String name;
    private String description;
    private int rating;
    private int locationId;
    private int personId;


    public Business(int businessId, String name, String description, int rating, int locationId, int personId) {
        this.businessId = businessId;
        this.name = name;
        this.description = description;
        this.rating = rating;
        this.locationId = locationId;
        this.personId = personId;
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

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
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
