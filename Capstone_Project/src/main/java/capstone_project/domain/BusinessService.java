package capstone_project.domain;

import capstone_project.data.BusinessJdbcTemplateRepository;
import capstone_project.data.BusinessRepository;
import capstone_project.models.Business;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BusinessService {


    private final BusinessRepository repository;

    public BusinessService(BusinessRepository businessRepository) {
        this.repository= businessRepository;
    }
    public List<Business> findAll() {
        return repository.findAll();
    }
    public Business findById(int businessId){
        return repository.findById(businessId);
    }
    public boolean deleteById(int businessId){
        return repository.deleteById(businessId);
    }

    private Result<Business> add(Business business){
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
    private Result<Business> update(Business business){
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
