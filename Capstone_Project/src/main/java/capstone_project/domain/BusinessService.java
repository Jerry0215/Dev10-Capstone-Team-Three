package capstone_project.domain;

import capstone_project.data.BusinessRepository;
import capstone_project.data.ReviewRepository;
import capstone_project.models.Business;
import capstone_project.models.Person;
import capstone_project.models.Review;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Service
public class BusinessService {


    private final BusinessRepository repository;

    private final ReviewRepository reviewRepository;



    public BusinessService(BusinessRepository businessRepository, ReviewRepository reviewRepository) {
        this.repository= businessRepository;
        this.reviewRepository = reviewRepository;
    }

    public List<Business> findByName(String prefix) throws SQLException, IOException {

        List<Business> searchResult = new ArrayList<>();

        searchResult.addAll(repository.findAll().stream().distinct()
                .filter(business ->
                        business.getName().toLowerCase().startsWith(prefix.toLowerCase())).toList());

        return searchResult;
    }

    public List<Business> findAll() throws SQLException, IOException {
        return repository.findAll();
    }
    public Business findById(int businessId) throws SQLException, IOException {
        return repository.findById(businessId);
    }

    public Business findByPerson(int personId) throws SQLException, IOException{
        return repository.findByPerson(personId);
    }
    public boolean deleteById(int businessId){
        return repository.deleteById(businessId);
    }

    public Result<Business> add(Business business){
        Result<Business> result = validate(business);
        if (!result.isSuccess()){
            return result;
        }
        if (business.getBusinessId()!=0){
            result.addMessage("businessId cannot be set", ResultType.INVALID);
        }

        business = repository.add(business);
        result.setPayload(business);
        return result;
    }



    public Result<Business> update(Business business) throws SQLException, IOException {
        Result<Business> result = validate(business);
        if (!result.isSuccess()){
            return result;
        }
        if (business.getBusinessId()<=0){
            result.addMessage("businessId must be set for update", ResultType.INVALID);
        }
        if (!repository.update(business)){
            result.addMessage("business not found", ResultType.NOT_FOUND);
        }
        return result;
    }


    private Result<Business> validate(Business business){
        Result<Business> result = new Result<>();
        if (business == null){
            result.addMessage("business cannot be null",ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(business.getName())){
            result.addMessage("businesses must have a name", ResultType.INVALID);
        }
        if (business.getLocationId() <0){
            result.addMessage("businesses must have a location", ResultType.INVALID);
        }
        if (business.getPersonId()<0){
            result.addMessage("businesses must have an owner", ResultType.INVALID);
        }

        return result;
    }
}
