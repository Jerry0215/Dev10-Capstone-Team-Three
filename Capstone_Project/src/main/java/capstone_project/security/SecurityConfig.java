package capstone_project.security;

import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {


    private final JwtConverter converter;

    public SecurityConfig(JwtConverter converter) {
        this.converter = converter;
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.cors();

        http.authorizeRequests()

                .antMatchers(HttpMethod.POST, "/authenticate", "/create_account").permitAll()

                .antMatchers(HttpMethod.GET, "/api/review/byReview/*", "/api/review/**",  "/api/event/**","/api/person","/api/person/**","/api/business","/api/business/**","/api/location","/api/location/**","/api/event","/api/event/**","/api/business/search/*","/api/person/search/*").hasAnyRole("ADMIN", "USER")

                .antMatchers(HttpMethod.POST, "/api/event","/api/person", "/api/business","/api/review").hasAnyRole("ADMIN", "USER")

                .antMatchers(HttpMethod.PUT, "api/review/**","api/review/edit/*","/api/event/**","/api/person/*","/api/business/*").hasAnyRole("ADMIN", "USER")

                .antMatchers(HttpMethod.DELETE, "/api/event/**", "/api/person/*","api/business/*").hasAnyRole("ADMIN","USER")

                .antMatchers("/**").denyAll()

                .and()
                .addFilter(new JwtRequestFilter(authenticationManager(), converter))
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);


    }

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }
}
