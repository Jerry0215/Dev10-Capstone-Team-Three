package capstone_project.security;

import capstone_project.models.AppUser;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;


@Component
public class JwtConverter {
    private final String ISSUER = "fake-yelp-app";
    private final String AUTHORITIES = "authorities";

    private final String APP_USER_ID = "appUserId";
    private final Key key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private final int EXPIRATION_MINUTES = 15;
    private final int EXPIRATION_TIME = EXPIRATION_MINUTES * 60 * 1000;


    public User getAppUserFromToken(String token) {
        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .requireIssuer(ISSUER)
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token);

            String username = jws.getBody().getSubject();
            int appUserId = (int) jws.getBody().get(APP_USER_ID);

            List<GrantedAuthority> authorities = Arrays.stream(((String)jws.getBody().get(AUTHORITIES)).split(","))
                    .map(SimpleGrantedAuthority::new)
                    .collect(Collectors.toList());

            return new AppUser(appUserId, username, username, false, AppUser.convertAuthoritiesToRoles(authorities));

        } catch (JwtException ex) {
            System.out.println(ex.getMessage());
        }

        return null;
    }

    public String getTokenFromAppUser(AppUser user) {

        String roles = user.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.joining(","));

        return Jwts.builder()
                .setIssuer(ISSUER)
                .setSubject(user.getUsername())

                .claim(AUTHORITIES, roles)
                .claim(APP_USER_ID, user.getAppUserId())

                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();

    }
}
