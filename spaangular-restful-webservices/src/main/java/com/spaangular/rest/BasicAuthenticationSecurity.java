package com.spaangular.rest;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.servlet.util.matcher.MvcRequestMatcher;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.servlet.handler.HandlerMappingIntrospector;

@Configuration
@EnableWebSecurity
public class BasicAuthenticationSecurity {
	
	@Bean
	MvcRequestMatcher.Builder mvc(HandlerMappingIntrospector introspector) {
	    return new MvcRequestMatcher.Builder(introspector);
	}

	
	@Bean
	public SecurityFilterChain basicSecurity(HttpSecurity httpSecurity, MvcRequestMatcher.Builder mvc) throws Exception {
		
		httpSecurity
				.csrf(csrfConfigurer -> csrfConfigurer.disable())
				//.cors(Customizer.withDefaults())				
				// .authorizeHttpRequests((authorizeRequests) -> authorizeRequests
				//		 .requestMatchers(HttpMethod.OPTIONS).permitAll())		
				.authorizeHttpRequests((authorizeRequests) -> authorizeRequests
						.requestMatchers(AntPathRequestMatcher.antMatcher(HttpMethod.OPTIONS,"/**")).permitAll());
		
		httpSecurity.authorizeHttpRequests((authorizationManagerRequestMatcherRegistry) -> 
		authorizationManagerRequestMatcherRegistry.requestMatchers(mvc.pattern("/**")).authenticated())
					.httpBasic(Customizer.withDefaults());
		return httpSecurity.build();
	}

}
