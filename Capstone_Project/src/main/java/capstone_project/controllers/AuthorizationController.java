package capstone_project.controllers;

//import capstone_project.domain.AppUserService;
//import capstone_project.models.AppUser;
//import capstone_project.security.JwtConverter;
import capstone_project.domain.AppUserService;
import capstone_project.models.AppUser;
import capstone_project.security.JwtConverter;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.User;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthorizationController {

    private final AuthenticationManager manager;
    private final JwtConverter converter;
    private final AppUserService service;

    public AuthorizationController(AuthenticationManager manager, JwtConverter converter, AppUserService service) {
        this.manager = manager;
        this.converter = converter;
        this.service = service;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authentication(@RequestBody Map<String, String> credentials) {

        String username = credentials.get("username");
        String password = credentials.get("password");

        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(username, password);

        var authentication = manager.authenticate(token);

        if(authentication.isAuthenticated()) {
            AppUser user = (AppUser) authentication.getPrincipal();

            String jwtToken = converter.getTokenFromAppUser(user);

            Map<String, String> returnMap = new HashMap<>();
            returnMap.put("jwt_token",jwtToken);
            return new ResponseEntity<>(returnMap, HttpStatus.OK);

        }

        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/create_account")
    public ResponseEntity<?> createAccount(@RequestBody Map<String, String> credentials) {

        String username = credentials.get("username");
        String password = credentials.get("password");

        AppUser user = service.create(username, password);

        Map<String, Integer> returnMap = new HashMap<>();
        returnMap.put("appUserId", user.getAppUserId());


        return new ResponseEntity<>(returnMap, HttpStatus.CREATED);
    }
}

