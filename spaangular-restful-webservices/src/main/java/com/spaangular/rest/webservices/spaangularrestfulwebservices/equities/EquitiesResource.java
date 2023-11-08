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
public class EquitiesResource {
	
	@Autowired
	private EquitiesHardcodedService equitiesHardcodedService;
	
	@GetMapping("/users/{userName}/equities")
	public List<Equity> getEquitiesForUser(@PathVariable String userName) {
		return equitiesHardcodedService.findAll();
	}

	@GetMapping("/users/{userName}/equities/{id}")
	public Equity getEquity(@PathVariable String userName, @PathVariable int id) {
		return equitiesHardcodedService.findById(id);
	}

	@PutMapping("/users/{userName}/equities/{id}")
	public ResponseEntity<Void> updateEquityForUser(@PathVariable String userName, @PathVariable int id, @RequestBody Equity updateEquity) {
		updateEquity.setId(id);
		if(equitiesHardcodedService.save(updateEquity)) {
			return ResponseEntity.accepted().build();
		}
		return ResponseEntity.badRequest().build();
	}

	@DeleteMapping("/users/{userName}/equities/{id}")
	public ResponseEntity<Void> deleteEquityForUser(@PathVariable String userName, @PathVariable int id) {
		if(equitiesHardcodedService.delete(id) != null) {
			return ResponseEntity.noContent().build();
		}
		
		return ResponseEntity.notFound().build();
	}

	@PostMapping("/users/{userName}/equities")
	public ResponseEntity<Void> addEquityForUser(@PathVariable String userName, @RequestBody Equity newEquity) {
		Equity addedEquity = equitiesHardcodedService.add(newEquity);
		if(addedEquity != null) {
			UriComponents buildAndExpand = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(addedEquity.getId());
			return ResponseEntity.created(buildAndExpand.toUri()).build();
		}
		
		return ResponseEntity.badRequest().build();
	}

}
