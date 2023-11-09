package com.spaangular.rest.webservices.spaangularrestfulwebservices.equities;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EquitiesJpaRepository extends JpaRepository<Equity, Long> {

	public List<Equity> findByName(String userName);
}
