package com.theironyard.novauc.repository;

import com.theironyard.novauc.domain.Items;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Items entity.
 */
@SuppressWarnings("unused")
public interface ItemsRepository extends JpaRepository<Items,Long> {

}
