package com.spaangular.rest.webservices.spaangularrestfulwebservices.equities;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.web.util.UriComponents;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class EquitiesJpaResource {
	
	@Autowired
	private EquitiesJpaRepository equitiesJpaRepository;
	
	@GetMapping("/users/{userName}/equities")
	public List<Equity> getEquitiesForUser(@PathVariable String userName) {
		return equitiesJpaRepository.findAll();
	}

	@GetMapping("/users/{userName}/equities/{id}")
	public Equity getEquity(@PathVariable String userName, @PathVariable Long id) {
		return equitiesJpaRepository.findById(id).get();
	}

	@PutMapping("/users/{userName}/equities/{id}")
	public ResponseEntity<Void> updateEquityForUser(@PathVariable String userName, @PathVariable Long id, @RequestBody Equity updateEquity) {
		updateEquity.setId(id);
		if(equitiesJpaRepository.save(updateEquity) != null) {
			return ResponseEntity.accepted().build();
		}
		return ResponseEntity.badRequest().build();
	}

	@DeleteMapping("/users/{userName}/equities/{id}")
	public ResponseEntity<Void> deleteEquityForUser(@PathVariable String userName, @PathVariable Long id) {
		equitiesJpaRepository.deleteById(id);
		return ResponseEntity.noContent().build();
		
	}

	@PostMapping("/users/{userName}/equities")
	public ResponseEntity<Void> addEquityForUser(@PathVariable String userName, @RequestBody Equity newEquity) {
		Equity addedEquity = equitiesJpaRepository.save(newEquity);
		if(addedEquity != null) {
			UriComponents buildAndExpand = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(addedEquity.getId());
			return ResponseEntity.created(buildAndExpand.toUri()).build();
		}
		
		return ResponseEntity.badRequest().build();
	}

}
