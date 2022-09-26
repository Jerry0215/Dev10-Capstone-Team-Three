package capstone_project.models;

import java.sql.Timestamp;

public class Review {
    private int reviewId;
    private String content;
    private Timestamp timeDate;
    private int rating;
    private int personId;
    private int businessId;

    public Review(int reviewId, String content, Timestamp timeDate, int rating, int personId, int businessId) {
        this.reviewId = reviewId;
        this.content = content;
        this.timeDate = timeDate;
        this.rating = rating;
        this.personId = personId;
        this.businessId = businessId;
    }

    public int getReviewId() {
        return reviewId;
    }

    public void setReviewId(int reviewId) {
        this.reviewId = reviewId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Timestamp getTimeDate() {
        return timeDate;
    }

    public void setTimeDate(Timestamp timeDate) {
        this.timeDate = timeDate;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public int getPersonId() {
        return personId;
    }

    public void setPersonId(int personId) {
        this.personId = personId;
    }

    public int getBusinessId() {
        return businessId;
    }

    public void setBusinessId(int businessId) {
        this.businessId = businessId;
    }
    public Review(){

    }
}
