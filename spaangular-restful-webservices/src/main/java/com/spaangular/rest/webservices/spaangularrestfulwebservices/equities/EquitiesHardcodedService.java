package com.spaangular.rest.webservices.spaangularrestfulwebservices.equities;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class EquitiesHardcodedService {
	
	private static List<Equity> hardcodedEquities = new ArrayList<>();
	private static int equityCounter = 0;
	
	static {
		hardcodedEquities.add(new Equity(++equityCounter, "stock1", 2, new BigDecimal(5000.00)));
		hardcodedEquities.add(new Equity(++equityCounter, "stock2", 10, new BigDecimal(75.00)));
		hardcodedEquities.add(new Equity(++equityCounter, "stock3", 5, new BigDecimal(3000.00)));
	}

	public List<Equity> findAll() {
		return hardcodedEquities;
	}
	
	public Equity findById(int id) {		
		Optional<Equity> matchedEquity = hardcodedEquities.stream().filter(equity -> equity.getId() == id).findFirst();
		return matchedEquity.isPresent() ? matchedEquity.get(): null;
	}
	
	public Equity delete(int id) {
		Equity matchedEquity = findById(id);
		if(matchedEquity != null) {
			hardcodedEquities.remove(matchedEquity);
		}
		return matchedEquity;
	}
	
	public boolean save(Equity updateEquity) {
		Equity matchedEquity = findById(updateEquity.getId());
		if(matchedEquity != null) {
			matchedEquity.setName(updateEquity.getName());
			matchedEquity.setQuantity(updateEquity.getQuantity());
			matchedEquity.setPrice(updateEquity.getPrice());
			return true;
		}
		return false;
	}
	
	public Equity add(Equity newEquity) {
		newEquity.setId(++equityCounter);
		hardcodedEquities.add(newEquity);
		return newEquity;
	}
}
